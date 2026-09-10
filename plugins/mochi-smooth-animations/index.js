(() => {
    const { patcher, metro, logger } = vendetta;
    const ReactNative = metro.common.ReactNative;
    const UIManager = ReactNative && ReactNative.UIManager;
    const LayoutAnimation = ReactNative && ReactNative.LayoutAnimation;

    const DURATION = 180;
    let unpatch = null;
    let lastAnimation = 0;

    function isUsefulUpdate(props) {
        if (!props || typeof props !== "object") return false;
        const style = props.style;
        if (!style) return false;
        const styles = Array.isArray(style) ? style : [style];
        return styles.some((s) => {
            if (!s || typeof s !== "object") return false;
            return [
                "opacity",
                "transform",
                "height",
                "width",
                "top",
                "left",
                "right",
                "bottom",
                "backgroundColor",
            ].some((key) => Object.prototype.hasOwnProperty.call(s, key));
        });
    }

    function animateNextLayout() {
        if (!LayoutAnimation || typeof LayoutAnimation.configureNext !== "function") return;
        const now = Date.now();
        if (now - lastAnimation < 35) return;
        lastAnimation = now;
        try {
            LayoutAnimation.configureNext({
                duration: DURATION,
                create: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.opacity,
                    duration: DURATION,
                },
                update: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                    duration: DURATION,
                },
                delete: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.opacity,
                    duration: DURATION,
                },
            });
        } catch (e) {
            logger?.error?.("Mochi Smooth Animations: LayoutAnimation failed", e);
        }
    }

    if (UIManager && typeof UIManager.updateView === "function") {
        unpatch = patcher.before("MochiSmoothAnimations", UIManager, "updateView", (args) => {
            if (args && isUsefulUpdate(args[2])) animateNextLayout();
        });
    }

    return {
        onUnload() {
            try {
                unpatch?.();
            } catch {}
            unpatch = null;
        },
    };
})()
