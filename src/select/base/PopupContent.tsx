import React, { Children, isValidElement, cloneElement } from 'react';
import { getSelectValueArr } from '../util/helper';
import { TdSelectProps, SelectValue } from '../../_type/components/select';
import useConfig from '../../_util/useConfig';
import Option, { SelectOptionProps } from './Option';

interface SelectPopupProps
  extends Pick<TdSelectProps, 'value' | 'size' | 'multiple' | 'empty' | 'options' | 'max' | 'loadingText' | 'loading'> {
  onChange?: (value: SelectValue, context?: { label?: string | number }) => void;
  /**
   * 是否展示popup
   */
  showPopup: boolean;
  /**
   * 控制popup展示的函数
   */
  setShowPopup: (show: boolean) => void;
  children?: React.ReactNode;
}

const PopupContent = (props: SelectPopupProps) => {
  const { onChange, value, size, max, multiple, showPopup, setShowPopup, options, empty, loadingText, loading } = props;

  const { classPrefix } = useConfig();
  if (!props.children && !props.options) return null;

  const onSelect: SelectOptionProps['onSelect'] = (selectedValue, { label, selected }) => {
    if (selectedValue) {
      if (multiple) {
        const values = getSelectValueArr(value, selectedValue, label, selected);
        onChange(values, { label });
        requestAnimationFrame(() => setShowPopup(true));
      } else {
        onChange(selectedValue, { label });
        setShowPopup(!showPopup);
      }
    }
  };

  const childrenWithProps = Children.map(props.children, (child) => {
    if (isValidElement(child)) {
      const addedProps = { size, max, multiple, selectedValue: value, onSelect };
      return cloneElement(child, { ...addedProps });
    }
    return child;
  });

  // 渲染 options
  const renderOptions = () => {
    if (options) {
      // 通过options API配置的
      return (
        <ul>
          {options.map(({ value: optionValue, label }, index) => (
            <Option
              key={index}
              max={max}
              label={label}
              value={optionValue}
              onSelect={onSelect}
              selectedValue={value}
              multiple={multiple}
              size={size}
            />
          ))}
        </ul>
      );
    }
    return <ul>{childrenWithProps}</ul>;
  };

  const isEmpty = (Array.isArray(childrenWithProps) && !childrenWithProps.length) || (options && options.length === 0);

  if (isEmpty) {
    return <div className={`${classPrefix}-select-empty`}>{empty ? empty : <p>无数据</p>}</div>;
  }

  if (loading) {
    return <div className={`${classPrefix}-select-loading-tips`}>{loadingText}</div>;
  }
  return <div>{renderOptions()}</div>;
};

export default PopupContent;
