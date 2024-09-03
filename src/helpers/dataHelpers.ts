const countFrequencies = (arr: string[]): Record<string, number> => {
    const frecuencias: Record<string, number> = {};
    
    arr.forEach(texto => {
        frecuencias[texto] = (frecuencias[texto] || 0) + 1;
    });
    
    return frecuencias;
  };

  const getTopRecords = (frecuencias: Record<string, number>, topN: number): [string, number][] => {
    return Object.entries(frecuencias)
        .sort((a, b) => b[1] - a[1])  
        .slice(0, topN);               
  };

  function classifyAges(ages: number[]) {

    const counts = {
      kids: 0,
      teenagers: 0,
      adults: 0,
      oldPeople: 0
    };
  
    ages.forEach(age => {
      if (age < 13) {
        counts.kids++;
      } else if (age >= 13 && age <= 19) {
        counts.teenagers++;
      } else if (age>19 && age<=60){
        counts.adults++;
      } else {
        counts.oldPeople++;
      }
    });
  
    return counts;
  }

  export {countFrequencies, getTopRecords ,classifyAges}