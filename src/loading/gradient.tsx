import React, { useEffect, useRef, FC } from 'react';
import classnames from 'classnames';

import useConfig from '../hooks/useConfig';
import circleAdapter from '../_common/js/loading/circle-adapter';

/**
 * Loading组件 渐变部分实现
 */
const GradientLoading: FC = () => {
  const { classPrefix } = useConfig();
  const conicRef = useRef();

  const gradientClass = `${classPrefix}-loading__gradient`;

  useEffect(() => {
    const el = conicRef?.current;
    circleAdapter(el);
  }, []);

  return (
    <svg
      className={classnames(gradientClass, `${classPrefix}-icon-loading`)}
      viewBox="0 0 14 14"
      version="1.1"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="1" y="1" width="12" height="12">
        <div className={`${gradientClass}-conic`} ref={conicRef} />
      </foreignObject>
    </svg>
  );
};
export default GradientLoading;
