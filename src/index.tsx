import { ResponsivePie } from '@nivo/pie'
import React from 'react'
import { registerWidget, IContextProvider } from './uxp'; 
 
interface IDonutChartProps{
    uxpContext?: IContextProvider;
}

export const DonutChart:React.FunctionComponent<IDonutChartProps> = (props) =>  {  

    let [data,setData] = React.useState([])

function getData () {

    props.uxpContext.executeAction("Example1","DONUTCHART",{},{json:true}).then(res=>{
        setData(res);
    }).catch(e=>{
        // reload();
    });

}
React.useEffect(() =>{
    getData();
}, [])

    return <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}

        // fill={[
        //     {
        //         match: {
        //             id: 'ruby'
        //         },
        //         id: 'dots'
        //     },
        //     
        //     {
        //         match: {
        //             id: 'scala'
        //         },
        //         id: 'lines'
        //     } 
        // ]}

        fill={[
            {
                match: {
                    id: 'Mechanical'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Electrical'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Plumbing'
                },
                id: 'dots'
            } 
        ]} 

        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />

    }
    




/**
 * Register as a Widget
 */
 registerWidget({
    id: "DonutChart",
    name: "Donut Chart",
    widget: DonutChart,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});