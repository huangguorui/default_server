export const items = {
    test:{
        title:'sssss',
        addKey:'test',
        items:[
            {
                key:'name',
                type:'input',
                title:'姓名'
            },
            {
                key:'sssss',
                type: 'select',
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
                /*change(value, options){
                    options.currentState[options.itemConfig.key] = value;
                    console.log(value)
                    console.log(options)
                }*/
            }
        ]
    }
}
