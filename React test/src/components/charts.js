import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function ChartView({charName, charPrice}){

    return(
        <div>
             <div className="charts">
                     <Pie
                        data={{
                            labels: charName,
                            datasets: [
                                {
                                    label: 'no of apps',
                                    data: charPrice,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },

                            ],
                        }}
                        height={400}
                        width={600}
                    />
                </div> 
        </div>
    )
}