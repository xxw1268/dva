import React, { Component } from 'react';
import { DatePicker, Button, Table, Checkbox, Tag } from 'antd';
import { connect } from 'dva';

@connect(
    ({ counter, esc }) => ({
        a: counter.a,
        results: esc.results,
        total: esc.total,
        current: esc.current,
        color:esc.color,
        engine:esc.engine,
        exhaust:esc.exhaust,
        fuel:esc.fuel,
    })
)
export default class App extends Component {
    componentWillMount() {
        // 发出dispatch命令
        this.props.dispatch({ 'type': 'esc/INITSAGA' });
    }
    render() {
        return (
            <div className="wrap">
                <style>{
                    `
                        .wrap{
                            width: 900px;
                            margin: 50px auto;
                        }
                        h2{
                            color: #333;
                            border-bottom:1px solid #ccc;
                            margin-top: 90px;
                        }
                        h3{
                            font-size:20px;
                            color:red
                        }
                    `
                }</style>
                <h1>你好，我是Dva，很高兴遇见你</h1>
                <div>
                    <h2>计数器演示：</h2>
                    <p>{this.props.a}</p>
                    <Button onClick={() => {
                        this.props.dispatch({ 'type': 'counter/JIA', 'n': 1 });
                    }}>按我加1</Button>
                    <Button onClick={() => {
                        this.props.dispatch({ 'type': 'counter/JIA', 'n': 2 });
                    }}>按我加2</Button>
                </div>
                <h2>异步演示：</h2>
                <h3>共为您找到{this.props.total}辆符合条件的车</h3>
                <div>
                    颜色：
                    <Checkbox.Group
                        value={this.props.color}
                        onChange={v=>{
                            this.props.dispatch({'type':'esc/CHANGEFILTER_SAGA','k':'color',v})
                        }}
                    >
                    {
                        ['红','橙','黄','绿','蓝','紫','白','黑','灰','银灰','咖啡','香槟','其他'].map(item=><Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                    </Checkbox.Group>
                </div>
                <div>
                    发动机：
                    <Checkbox.Group
                        value={this.props.engine}
                        onChange={v=>{
                            this.props.dispatch({'type':'esc/CHANGEFILTER_SAGA','k':'engine',v})
                        }}
                    >
                    {
                        ['1.0L','1.2L','1.4L','1.6L','1.8L','2.0L','3.0L','5.0L','1.6T'].map(item=><Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                    </Checkbox.Group>
                </div>
                <div>
                    尾气：
                    <Checkbox.Group
                        value={this.props.exhaust}
                        onChange={v=>{
                            this.props.dispatch({'type':'esc/CHANGEFILTER_SAGA','k':'exhaust',v})
                        }}
                    >
                    {
                        ['国一','国二','国三','国四','国五'].map(item=><Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                    </Checkbox.Group>
                </div>
                <div>
                    燃料：
                    <Checkbox.Group
                        value={this.props.fuel}
                        onChange={v=>{
                            this.props.dispatch({'type':'esc/CHANGEFILTER_SAGA','k':'fuel',v})
                        }}
                    >
                    {
                        ['柴油','汽油','纯电动','油电混合'].map(item=><Checkbox
                            key={item}
                            value={item}
                        >
                            {item}
                        </Checkbox>)
                    }
                    </Checkbox.Group>
                </div>
                <br/>
                <div>
                {
                    [
                        {'e':'color','c':'颜色'},
                        {'e':'engine','c':'发动机'},
                        {'e':'exhaust','c':'尾气'},
                        {'e':'fuel','c':'燃料'},
                    ].map(item=>{
                        if(this.props[item.e].length!=0){
                            return <Tag key={item} closable
                                onClose={()=>{
                                    this.props.dispatch({'type':'esc/CHANGEFILTER_SAGA','k':item.e,'v':[]})
                                }}
                            >
                                {item.c}：{this.props[item.e].join(' 或 ')}
                            </Tag>
                        }
                    })
                }
                </div>
                <br/>
                <Table
                    rowKey="id"
                    columns={[
                        {
                            'title': '图片',
                            'key': 'image',
                            'dataIndex': 'image',
                            'render': (txt, { id }) => {
                                return <div>
                                    <img src={`http://192.168.2.250:3000/images/carimages_small/${id}/view/${txt}`} />
                                </div>
                            }
                        },
                        { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                        { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                        { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                        { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                        { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                        { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                        { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                    ]}
                    dataSource={this.props.results}
                    pagination={{
                        'total': this.props.total,
                        'current': this.props.current,
                        'pageSize': this.props.pageSize,
                        'onChange': (current) => {
                            this.props.dispatch({ 'type': 'esc/CHANGECURRENT_SAGA', 'current': current });
                        }
                    }}
                />
            </div>
        );
    }
}