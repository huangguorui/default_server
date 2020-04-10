const itemTest = [
    {
        key:'name',
        type:'input',
        title:'姓名',
        createState:'user',
    },
    {
        key:'sssss',
        type: 'select',
        title:'等级',
        dataSource:[
            {
                id:1,
                name:'A'
            },
            {
                id:2,
                name:'B'
            },
            {
                id:3,
                name:'C'
            }
        ],
        change(value, options){
            options.change(value)
            console.log(value)
            console.log(options)
        }
    }
];
export const items = {
    test:{
        title:'测试TILE',
        createState:'testKey',
        items:itemTest
    },
    aaa: {
        title:'title2',
        items: [
            {
                key:'age',
                title:'年纪'
            }
        ]
    }
};

export const itemsArr = itemTest;
