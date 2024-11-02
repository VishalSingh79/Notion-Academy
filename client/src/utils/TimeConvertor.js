function parseDuration(durationString) {
    let totalSeconds = 0;

    // Regular expressions to match hours, minutes, and seconds
    const hourMatch = /(\d+)hr/.exec(durationString);
    const minuteMatch = /(\d+)min/.exec(durationString);
    const secondMatch = /(\d+)sec/.exec(durationString);

    // Convert hours to seconds and add to total
    if (hourMatch) {
        totalSeconds += parseInt(hourMatch[1]) * 3600;
    }

    // Convert minutes to seconds and add to total
    if (minuteMatch) {
        totalSeconds += parseInt(minuteMatch[1]) * 60;
    }

    // Add seconds to total
    if (secondMatch) {
        totalSeconds += parseInt(secondMatch[1]);
    }

    return totalSeconds;
}

function convertSecondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Create an array to hold non-zero time parts
    const timeParts = [];

    // Push non-zero parts into the array
    if (hours > 0) {
        timeParts.push(`${hours}hr`);
    }
    if (minutes > 0) {
        timeParts.push(`${minutes}min`);
    }
    if (seconds > 0) {
        timeParts.push(`${seconds}sec`);
    }

    // Return the formatted string or "0sec" if no parts are added
    return timeParts.length > 0 ? timeParts.join(' ') : '0sec';
}

export function calculateTotalCourseDuration(course) {
    let totalTimeInSeconds = 0;

    // Iterate over course content to calculate total duration in seconds
    course.courseContent.forEach((section) => {
        section.subSection.forEach((subSection) => {
            totalTimeInSeconds += parseDuration(subSection.timeDuration);
        });
    });

    // Convert total duration back to a readable format
    return convertSecondsToHMS(totalTimeInSeconds);
}
