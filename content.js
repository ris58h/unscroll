let previousState = null;

let unscrolling = false;

let beforeScrollState = state();
let beforeScrollTimestamp = Date.now();

document.addEventListener("scroll", () => {
    if (unscrolling) {
        return;
    }

    const newState = state();
    const newTimestamp = Date.now();

    const interval = (newTimestamp - beforeScrollTimestamp) / 1000;
    // Usualy interval is around 0.02 but there is a some strange one-time delay if spacebar is being pressed.
    if (interval > 0.1) {
        previousState = beforeScrollState;
    }

    beforeScrollState = newState;
    beforeScrollTimestamp = newTimestamp;
});

let prevKeyIsGraveAccent = false;
document.addEventListener('keyup', function(e) {
    if (e.key == '`') {
        if (prevKeyIsGraveAccent) {
            prevKeyIsGraveAccent = false;
            if (previousState != null) {
                const s = state();
                if (s.x != previousState.x || s.y != previousState.y) {
                    unscrolling = true;
    
                    window.scrollTo(previousState.x, previousState.y);
                    
                    beforeScrollState = previousState;
                    beforeScrollTimestamp = Date.now();
                    previousState = s;
    
                    unscrolling = false;
                }
            }
        } else {
            prevKeyIsGraveAccent = true;
        }
	}
});

function state() {
    return {
        "x": window.pageXOffset,
        "y": window.pageYOffset,
    }
}