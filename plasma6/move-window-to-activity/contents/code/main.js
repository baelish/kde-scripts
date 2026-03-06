// print("DEBUG: loading move-window-to-activity script");

registerShortcut(
    "ToggleAllActivities",
    "Toggle Window on All Activities",
    "",
    function () {
        // print("DEBUG: toggle all activities")
        var window = workspace.activeWindow;
        // print("DEBUG: current window: " + window) 
        // print("DEBUG: current activity: " + workspace.currentActivity)
        // print("DEBUG: activities current window is on: " + window.activities) 
        if (!window) return;
        if (window.activities.length === 0) {
            window.activities = [workspace.currentActivity];
        } else {
            window.activities = [];
        }
    }
);

workspace.activities.forEach(function(activityId) {
    callDBus(
        "org.kde.ActivityManager", 
        "/ActivityManager/Activities", 
        "org.kde.ActivityManager.Activities", 
        "ActivityName", 
        activityId, 
        function(name) {
            var displayName = name || activityId.substring(0, 5);

            registerShortcut(
                "MoveToActivity_" + activityId, 
                "Move Window to Activity: " + displayName, 
                "", 
                function() {
                    var window = workspace.activeWindow;
                    if (window) {
                        // print("DEBUG: move " + window + " to " + displayName)
                        window.activities = [activityId];
                    }
                }
            );
        }
    );
});
