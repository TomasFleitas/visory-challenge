
import dayjs from 'dayjs';
import { FormInstance } from 'antd';
import { useDateValidation } from 'hooks/useDateValidation';
import { renderHook } from '@testing-library/react';

const mockFormInstance = {
  getFieldValue: jest.fn(),
} as any;

describe('useDateValidation', () => {
  it('should return false for disabledStartDate when no endDate is set', () => {
    mockFormInstance.getFieldValue.mockReturnValueOnce(null);

    const { result } = renderHook(() => useDateValidation(mockFormInstance));

    expect(result.current.disabledStartDate(dayjs())).toBe(false);
  });

  it('should return true for disabledStartDate when currentDate is after endDate', () => {
    const endDate = dayjs().subtract(1, 'day');
    mockFormInstance.getFieldValue.mockReturnValueOnce(endDate);

    const { result } = renderHook(() =>
      useDateValidation(mockFormInstance as FormInstance),
    );

    expect(result.current.disabledStartDate(dayjs())).toBe(true);
  });

  it('should return false for disabledEndDate when no startDate is set', () => {
    mockFormInstance.getFieldValue.mockReturnValueOnce(null);

    const { result } = renderHook(() =>
      useDateValidation(mockFormInstance as FormInstance),
    );

    expect(result.current.disabledEndDate(dayjs())).toBe(false);
  });

  it('should return true for disabledEndDate when currentDate is before startDate', () => {
    const startDate = dayjs().add(1, 'day');
    mockFormInstance.getFieldValue.mockReturnValueOnce(startDate);

    const { result } = renderHook(() =>
      useDateValidation(mockFormInstance as FormInstance),
    );

    expect(result.current.disabledEndDate(dayjs())).toBe(true);
  });
});
