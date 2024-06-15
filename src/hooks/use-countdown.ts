import { useEffect } from 'react';
import { useLocalStorageState } from './use-storage';
import { TOTAL_TIME } from '@/constants/constants';
import { StatisticsProps, useTimerStore } from '@/store/timer-store';
import { TasksArrayProps, useTasksStore } from '@/store/tasks-store';

export const useCountdown = () => {
  const timerStore = useTimerStore();
  const tasksStore = useTasksStore();

  const {
    timeRemaining,
    setTimeRemaining,
    isRunning,
    setIsRunning,
    stopCount,
    setStopCount,
    isStarted,
    setIsStarted,
    workingTime,
    setWorkingTime,
    isPaused,
    setIsPaused,
    pauseTime,
    setPauseTime,
    setStatisticArray,
  } = timerStore;

  const {
    tasksArray,
    setTasksArray,
    taskCountIsDone,
    setTaskCountIsDone,
    successTaskCount,
    setSuccessTaskCount,
    fullTimeValue,
    setFullTimeValue,
  } = tasksStore;

  const [storageStatistics, setStorageStatistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [lastSavedTime, setLastSavedTime] = useLocalStorageState<number>(
    'lastSavedTime',
    TOTAL_TIME,
  );

  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>(
    'tasksArray',
    [],
  );

  useEffect(() => {
    let countdownTimer: any = null;
    let pauseTimer: any = null;
    const currentDay = new Date().getDay();
    const dayStatisticsIndex = storageStatistics.findIndex((item) => item.day === currentDay);
    const updatedStatistics = [...storageStatistics];

    const commonStatisticsData = {
      stopCount,
      workingTime,
      pauseTime,
      successTaskCount,
      day: currentDay,
      taskCountIsDone,
      date: new Date(),
    };

    const handleInterval = () => {
      setTimeRemaining(timeRemaining - 1);
      setLastSavedTime(timeRemaining - 1);
      setWorkingTime(workingTime + 1);

      if (dayStatisticsIndex !== -1) {
        updatedStatistics[dayStatisticsIndex] = {
          ...updatedStatistics[dayStatisticsIndex],
          workingTime: workingTime + 1,
        };
      } else {
        updatedStatistics.push({
          ...commonStatisticsData,
          workingTime: workingTime + 1,
        });
      }

      setStorageStatistics(updatedStatistics);
      setStatisticArray(updatedStatistics);
    };

    if (isRunning) {
      countdownTimer = setInterval(handleInterval, 1000);
    } else {
      clearInterval(countdownTimer);
    }

    if (isPaused) {
      pauseTimer = setInterval(() => {
        setPauseTime(pauseTime + 1);

        if (dayStatisticsIndex !== -1) {
          updatedStatistics[dayStatisticsIndex] = {
            ...updatedStatistics[dayStatisticsIndex],
            pauseTime: pauseTime + 1,
          };
        } else {
          updatedStatistics.push({
            ...commonStatisticsData,
            pauseTime: pauseTime + 1,
          });
        }

        setStorageStatistics(updatedStatistics);
        setStatisticArray(updatedStatistics);
      }, 1000);
    } else {
      clearInterval(pauseTimer);
    }

    if (timeRemaining === 0) {
      const filteredArray = tasksArray
        .map((item, index) => ({
          ...item,
          pomodoros: index === 0 ? item.pomodoros - 1 : item.pomodoros,
        }))
        .filter((item) => item.pomodoros !== 0);

      setTasksArray(filteredArray);
      setStorageTasks(filteredArray);

      setSuccessTaskCount(successTaskCount + 1);
      setFullTimeValue(fullTimeValue - 25);

      if (dayStatisticsIndex !== -1) {
        updatedStatistics[dayStatisticsIndex] = {
          ...updatedStatistics[dayStatisticsIndex],
          successTaskCount: successTaskCount + 1,
        };
      } else {
        updatedStatistics.push({
          ...commonStatisticsData,
          successTaskCount: successTaskCount + 1,
        });
      }

      setStorageStatistics(updatedStatistics);
      setStatisticArray(updatedStatistics);

      if (tasksArray.length !== filteredArray.length) {
        setTaskCountIsDone(taskCountIsDone + 1);

        if (dayStatisticsIndex !== -1) {
          updatedStatistics[dayStatisticsIndex] = {
            ...updatedStatistics[dayStatisticsIndex],
            taskCountIsDone: taskCountIsDone + 1,
          };
        } else {
          updatedStatistics.push({
            ...commonStatisticsData,
            taskCountIsDone: taskCountIsDone + 1,
          });
        }

        setStorageStatistics(updatedStatistics);
        setStatisticArray(updatedStatistics);
      }

      clearInterval(countdownTimer);
      setIsRunning(false);
      setTimeRemaining(TOTAL_TIME);
      setLastSavedTime(TOTAL_TIME);
      setIsStarted(false);

      alert('Count down');
    }

    return () => {
      clearInterval(countdownTimer);
      clearInterval(pauseTimer);
    };
  }, [
    taskCountIsDone,
    tasksArray,
    isRunning,
    isPaused,
    timeRemaining,
    successTaskCount,
    fullTimeValue,
    lastSavedTime,
    pauseTime,
    setStorageStatistics,
    setStatisticArray,
    workingTime,
    setWorkingTime,
  ]);

  const addOneMinute = () => {
    setIsRunning(false);
    if (tasksArray.length !== 0) {
      isStarted && setIsPaused(true);
      setTimeRemaining(timeRemaining + 60);
      setLastSavedTime((prev) => prev + 60);
    }
  };

  const start = () => {
    setTimeRemaining(timeRemaining);
    setLastSavedTime(timeRemaining);
    tasksArray.length !== 0 && setIsRunning(true);
    tasksArray.length !== 0 && setIsStarted(true);
    setIsPaused(false);
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (!isRunning && timeRemaining > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const stop = () => {
    setIsRunning(false);
    setTimeRemaining(TOTAL_TIME);
    setLastSavedTime(TOTAL_TIME);
    setIsPaused(false);
    setStopCount(stopCount + 1);

    if (isStarted) {
      const currentDay = new Date().getDay();
      const dayStatisticsIndex = storageStatistics.findIndex((item) => item.day === currentDay);
      const updatedStatistics = [...storageStatistics];

      updatedStatistics[dayStatisticsIndex] = {
        ...updatedStatistics[dayStatisticsIndex],
        stopCount: stopCount + 1,
      };

      setStorageStatistics(updatedStatistics);
      setStatisticArray(updatedStatistics);
    }

    setIsStarted(false);
  };

  const skip = () => {
    stop();
    setFullTimeValue(fullTimeValue - 25);
    setTasksArray(tasksArray.slice(1));
    setStorageTasks(tasksArray.slice(1));
  };

  return {
    start,
    pause,
    resume,
    stop,
    skip,
    addOneMinute,
  };
};