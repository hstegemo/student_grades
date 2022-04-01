# student_grades
App development project. Got some help with a NaN failure, that got fixed by checking the 
length of the arrays that were used for labels ands dataset.

Error:
Invariant Violation: [307,"RNSVGCircle",41,{"responsible":true,"fill":-1,"fillOpacity":0,"propList":["fill","fillOpacity"],
"cx":212.89795918367346,"cy":"<<NaN>>","r":"14"}] is not usable as a native method argument
  
Fix:
data={{
          labels: valid329Students.length != 0 ? valid329Students : ['none'],
          datasets: [
            {
              data: valid329Scores.length != 0 ? valid329Scores : [0]
            }
          ]
        }}
