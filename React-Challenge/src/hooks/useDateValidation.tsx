import { FormInstance } from 'antd';
import { useCallback } from 'react';

export const useDateValidation = (form: FormInstance) => {
  const disabledStartDate = useCallback((currentDate) => {
    const endDate = form.getFieldValue('endDate');
    if (!currentDate || !endDate) {
      return false;
    }
    return currentDate.isAfter(endDate, 'day');
  }, []);

  const disabledEndDate = useCallback((currentDate) => {
    const startDate = form.getFieldValue('startDate');
    if (!currentDate || !startDate) {
      return false;
    }
    return currentDate.isBefore(startDate, 'day');
  }, []);

  return { disabledStartDate, disabledEndDate };
};
