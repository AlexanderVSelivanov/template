import React from 'react';
import {
  AppNotification, isAppNotificationError,
  isAppNotificationInformation,
  isAppNotificationSuccess,
  isAppNotificationWarning,
} from 'types/AppNotification';
import useStyles from './styles';
import {Doughnut} from 'react-chartjs-2';
import {isEmpty, isSuccessProperty} from 'template-common';

type BlockProps = {
  notifications: AppNotification[],
};

const Block: React.FC<BlockProps> = ({notifications}) => {
  const classes = useStyles();

  return (
    <Doughnut
      data={{
        labels: ['Information', 'Success', 'Warning', 'Error'],
        datasets: [
          {
            label: 'Count',
            data: [
              notifications
                .filter(isAppNotificationInformation).length,
              notifications
                .filter(isAppNotificationSuccess).length,
              notifications
                .filter(isAppNotificationWarning).length,
              notifications
                .filter(isAppNotificationError).length,
            ],
            backgroundColor: [
              'rgba(0,0,255,0.5)',
              'rgba(0,255,0,0.5)',
              'rgba(255,255,0,0.5)',
              'rgba(255,0,0,0.5)',
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      }}
    />
  );
};

export default Block;
