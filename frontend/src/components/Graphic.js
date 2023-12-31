import React from 'react';
import { ResponsiveLine } from '@nivo/line'

function Graphic({
  data,
  legendLeft,
  legendBottom,
  enableArea,
  curve='natural',
  pointColor='#b32323',
  enableGridX=true,
  enableGridY=true,
  enablePoints=true,
  enablePointLabel=false
}) {

  return(
    <>
      <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false
          }}
          yFormat=" >-.2f"
          curve={curve}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: legendBottom,
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: legendLeft,
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          enablePoints={enablePoints}
          pointSize={10}
          colors={{ scheme: 'category10' }}
        //   pointColor={{ theme: 'background' }}
          pointColor={pointColor}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={enablePointLabel}
          pointLabelYOffset={-12}
          useMesh={true}
        //   enablePointLabel={true}
          enableArea={enableArea}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
    </>
  );
}

export default Graphic;