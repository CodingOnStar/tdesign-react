import React from 'react';
import { testExamples, render, fireEvent } from '@test/utils';
import Radio from "../Radio";


// 测试组件代码 Example 快照
testExamples(__dirname);

describe('Radio', () => {
  test('checked & children', () => {
    const { container, queryByText } = render(<Radio checked={true}>单选框</Radio>);
    expect(container.firstChild).toHaveClass("t-radio", "t-is-checked")
    expect(queryByText('单选框')).toBeInTheDocument();
  })

  test('defaultChecked', () => {
    const { container } = render(<Radio defaultChecked={true}></Radio>);
    expect(container.firstChild).toHaveClass('t-radio', 't-is-checked');
  })

  test('allowUncheck', () => {
    const { container } = render(<Radio allowUncheck={true} checked={true}/>);
    fireEvent.click(container.firstChild)
    expect(container.firstChild).toHaveClass('t-radio', 't-is-checked')
  })

  test('disable', () => {
    const fn = jest.fn()
    const { container } = render(<Radio disabled={true} onChange={fn}></Radio>);
    expect(container.firstChild).toHaveClass('t-is-disabled', 't-radio');
    fireEvent.click(container.firstChild);
    expect(fn).toBeCalledTimes(0);
  })

  test('label', () => {
    const { queryByText } = render(<Radio label='选中项'/>);
    expect(queryByText('选中项')).toBeInTheDocument()
  })

  test('name', () => {
    const { asFragment } = render(<Radio name={'Radio-name'}></Radio>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('onChange', () => {
    const fn = jest.fn();
    const { container } = render(<Radio disabled={true} onChange={fn}/>);
    fireEvent.click(container.firstElementChild)
    expect(fn).toBeCalledTimes(0);
  })
});

describe('RadioGroup', () => {
  test('value', () => {
    const { container } = render(
      <Radio.Group value='gz'>
        <Radio value='gz'>广州</Radio>
        <Radio value='sz' disabled>深圳</Radio>
      </Radio.Group>
    );
    expect(container.firstChild.firstChild).toHaveClass('t-is-checked')
  })

  test('onChange', () => {
    const fn = jest.fn();
    const { container } = render(
      <Radio.Group defaultValue='sz' onChange={fn}>
        <Radio value="gz">广州</Radio>
        <Radio value="sz" disabled>
          深圳
        </Radio>
      </Radio.Group>,
    );
    fireEvent.click(container.firstChild.firstChild);
    expect(fn).toBeCalledTimes(1);
  });

  test('options', () => {
    const { container, asFragment } = render(
      <Radio.Group
        defaultValue='北京'
        options={[
          { value: '上海', label: '上海' },
          { value: '广州', label: '广州', disabled: true },
          '北京',
          1
        ]}></Radio.Group>
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(container.firstChild.lastChild)
    expect(container.firstChild.lastChild).toHaveClass('t-is-checked')
  });

  test('option is string', () => {
    const { asFragment } = render(<Radio.Group options={[ '北京', '广州' ]}/>);
    expect(asFragment()).toMatchSnapshot();
  })

  test('option is number', () => {
    const { asFragment } = render(<Radio.Group options={[ 1, 2 ]}></Radio.Group>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('value is string', () => {
    const { container } = render(<Radio.Group options={[ '北京', '广州' ]} value='北京'></Radio.Group>);
    expect(container.firstChild.firstChild).toHaveClass('t-is-checked');
  });

  test('value is number', () => {
    const { container } = render(<Radio.Group options={[ 1, 2 ]} value={1}></Radio.Group>);
    expect(container.firstChild.firstChild).toHaveClass('t-is-checked');
  });

  test('defaultValue', () => {
    const { container } = render(
      <Radio.Group defaultValue='gz'>
        <Radio value="gz">广州</Radio>
        <Radio value="sz" disabled>
          深圳
        </Radio>
      </Radio.Group>,
    );
    expect(container.firstChild.firstChild).toHaveClass('t-is-checked');
  });

  test('disabled', () => {
    const { asFragment } = render(<Radio.Group options={[ '北京', '广州' ]} disabled></Radio.Group>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('name', () => {
    const { asFragment } = render(
      <Radio.Group name={'Radio-group-name'}>
        <Radio value="gz">广州</Radio>
        <Radio value="sz" disabled>
          深圳
        </Radio>
      </Radio.Group>,
    );
    expect(asFragment()).toMatchSnapshot();
  });


  test('size', () => {
    const { asFragment } = render(
      <div>
        <Radio.Group size='small'>
          <Radio value="gz">广州</Radio>
        </Radio.Group>

        <Radio.Group size='medium'>
          <Radio value="gz1">广州</Radio>
        </Radio.Group>

        <Radio.Group size='large'>
          <Radio value="gz2">广州</Radio>
        </Radio.Group>
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  })

  test('variant', () => {
    const { asFragment } = render(
      <div>
        <Radio.Group variant='outline' defaultValue='gz'>
          <Radio value="gz">广州</Radio>
          <Radio value="sz">深圳</Radio>
        </Radio.Group>

        <Radio.Group variant='primary-filled' defaultValue='gz1'>
          <Radio value="gz1">广州</Radio>
          <Radio value="sz1">深圳</Radio>
        </Radio.Group>

        <Radio.Group variant='default-filled' defaultValue='gz2'>
          <Radio value="gz2">广州</Radio>
          <Radio value="sz2">深圳</Radio>
        </Radio.Group>
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  })
})
