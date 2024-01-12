import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, registerables } from 'chart.js';
import { CategoryScale } from 'chart.js';

Chart.register(...registerables);
Chart.register(CategoryScale);
Chart.register(ArcElement);

const ResultsCharts = (props) => {

    const {
        results
    } = props

    if(!results){
        return <><Card style={{ borderRadius: 10, border: '1px solid #E4E4E4', boxShadow: 'none', padding: 10}}> 
        <p style={{fontWeight:'bold'}}>Results are not generated for this election yet...</p> 
        <p>Please wait till the admin generates the results</p> 
        </Card></>
    }

    const first_votes = results.first_votes === null? 0: results.first_votes
    const second_votes = results.second_votes === null?0: results.second_votes
    const third_votes = results.third_votes === null? 0: results.third_votes 
    const total_votes = results.no_of_votes === null?0: results.no_of_votes
    const first_candidate = results.first_candidate_name === null? "---": results.first_candidate_name 
    const second_candidate = results.second_candidate_name === null?"---":results.second_candidate_name 
    const third_candidate = results.third_candidate_name === null? "---": results.third_candidate_name

  const data1 = {
    labels: [first_candidate, second_candidate, third_candidate, 'Other'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff'],
        data: [(first_votes/total_votes)*100,
         (second_votes/total_votes)*100, 
         (third_votes/total_votes)*100, 
         ((total_votes-first_votes-second_votes-third_votes)/total_votes)*100],
      },
    ],
  };


  const data2 = {
    labels: [first_candidate, second_candidate, third_candidate, 'Other'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: ['#004c6d', '#4c7c9b', '#86b0cc', '#c1e7ff'],
        data: [first_votes,
            second_votes,
            third_votes,
            (total_votes-first_votes-second_votes-third_votes)
        ]
      },
    ],
  };

  return (
    <Card style={{ borderRadius: 10, border: '1px solid #E4E4E4', boxShadow: 'none', padding: 10 }}>
      <CardContent>
        <Container>
          <Grid container spacing={3}>
             
            <Grid item xs={12} md={6} lg={6}>
              <Pie data={data1} />
            </Grid>

            {/* Text */}
            <Grid item container xs={12} md={6} lg={6} justifyContent="center" alignItems="center">
              <Grid item>
                <p style={{ fontSize: 25, fontWeight: 'bold',color:'#004c6d'}}>1st. {first_candidate}  {(first_votes/total_votes)*100}%</p>
                <p style={{ fontSize: 25 , color:'#4c7c9b'}}>2nd. {second_candidate}  {(second_votes/total_votes)*100}%</p>
                <p style={{ fontSize: 20, color:'#86b0cc' }}>3rd. {third_candidate}  {(third_votes/total_votes)*100}%</p>
              
              </Grid>
            </Grid>

            {/* Bar Chart */}
            <Grid item container xs={12} md={12} lg={12}>
              <Bar
                data={data2}
                options={{
                  scales: {
                    x: {
                      type: 'category', // Use 'category' scale for the x-axis
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                  responsive: true,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

export default ResultsCharts;
