function calculateLoveScore(boysName, girlsName) {
    const combinedNames = (boysName + girlsName).toLowerCase().replaceAll(/\s/g, '');
    
    let totalAscii = 0;

    for (let i = 0; i < combinedNames.length; i++) {
        totalAscii += combinedNames.charCodeAt(i);
    }

    const score = totalAscii % 101;

    return score;
}