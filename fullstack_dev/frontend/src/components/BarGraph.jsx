import React, {useEffect, useContext, useState} from 'react'
import ReactEcharts from 'echarts-for-react'

const BarGraph = ({type}) => {
    const [ratingType, setRatingType] = useState(type);
    const [data, setData] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [classes, setClasses] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [averageRatings, setAverageRatings] = useState([]);

    const divisions = ['Accountancy', 'Business & Management', 'Engineering & Architecture', 'Nursing', 'Education', 'Natural Sciences & Mathematics', 'Social Sciences', 'Humanities & Letters', 'Computer Studies'];

    useEffect(() => {
        setRatingType(type);
        const fetchData = async() => {
            try{
                const [professorsRes, classesRes, ratingsRes] = await Promise.all([
                    fetch(`https://topprofessor.onrender.com/api/professors/`),
                    fetch(`https://topprofessor.onrender.com/api/classes/`),
                    fetch(`https://topprofessor.onrender.com/api/ratings/`),
                ]);
                const [professorsData, classesData, ratingsData] = await Promise.all([
                    professorsRes.json(),
                    classesRes.json(),
                    ratingsRes.json(),
                  ]);
                  setProfessors(professorsData);
                  setClasses(classesData);
                  setRatings(ratingsData);
            }catch (error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [type]);

    useEffect(() => {
        if(ratings && classes && professors){
             const divisionAverages = divisions.map(division => {
                const filteredProfs = professors.filter(prof =>
                    prof.division === division || prof.program === division
                );
                const profIds = filteredProfs.map(prof => prof.professorID);
                const filteredClasses = classes.filter(cls => profIds.includes(cls.professorID));
                
                const classIds = filteredClasses.map(cls => cls.classID);
                const divisionRatings = ratings.filter(rating => classIds.includes(rating.classID));
                
                if (divisionRatings && divisionRatings.length > 0) {
                    let ratingNum = "";
                    switch (String(ratingType)){
                        case "Overall Rating":
                            ratingNum = "rating1";
                            break;
                        case "Teaching Proficiency":
                            ratingNum = "rating2";
                            break;
                        case "Availability & Responsiveness":
                            ratingNum = "rating3";
                            break;
                        case "Attendance":
                            ratingNum = "rating4";
                            break;
                    }
                    const totalRating1 = divisionRatings.reduce((sum, rating) => sum + parseFloat(rating[ratingNum]), 0);
                    const avgRating1 = totalRating1 / divisionRatings.length;
                    return { division, averageRating1: avgRating1.toFixed(2) };
                } else {
                    return { division, averageRating1: 0 };
                }
            });
            setAverageRatings(divisionAverages);
        }
    }, [ratings, classes, professors]);

      if(averageRatings && averageRatings.length > 0){
        const data = averageRatings.map(item => item.averageRating1);
        const rating = type;
        const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
            },
            yAxis: {
                type: 'category',
                data: ['ACC', 'B&M', 'SEA', 'SON', 'SOE', 'NSM', 'SS', 'HumLet', 'CS']
            },
            xAxis: {
                type: 'value'
            },
            grid: {
                bottom: '10%',
                height: 'full',
            },
            series: [
                {
                    name: ratingType,
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data,
                    itemStyle: {
                        color: '#00215E'
                    }
                }
            ]
          };
        return <ReactEcharts option={option}/>;
      }
}

export default BarGraph;