const searchContents = [
  {
    type: 'input',
    name: 'input',
    value: '11',
    placeholder: '这是一个文本输入框',
    disabled: true,
    clearable: false,
    span: 8,
  },
  {
    type: 'select',
    name: 'select',
    value: '11',
    disabled: false,
    clearable: true,
    placeholder: '这是一个选择框',
    options: [
      { value: '11', label: '11' },
      { value: '22', label: '22' },
      { value: '33', label: '33' },
    ],
  },
  {
    type: 'cascader',
    name: 'cascader',
    value: '11',
    disabled: true,
    clearable: false,
    placeholder: '这是一个级联选择框',
    options: [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              { value: 'yizhi', label: '一致' },
              { value: 'fankui', label: '反馈' },
              { value: 'xiaolv', label: '效率' },
              { value: 'kekong', label: '可控' },
            ],
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              { value: 'cexiangdaohang', label: '侧向导航' },
              { value: 'dingbudaohang', label: '顶部导航' },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'oneDatePicker',
    name: 'oneDatePicker',
    value: new Date(),
    placeholder: '这是单个日前框',
    disabled: true,
    clearable: false,
  },
  {
    type: 'twoDatePicker',
    name: 'twoDatePicker',
    values: [ new Date(), new Date('2020/9/2') ],
    placeholder: '这是单个日前框',
    disabled: true,
    clearable: false,
  },
]
export default searchContents
