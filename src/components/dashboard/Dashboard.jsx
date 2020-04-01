/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon ,Radio,DatePicker} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {connectAlita} from 'redux-alita';
import SearchSelect from './moudle/SearchSelect';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { RangePicker } = DatePicker;

function disabledDate(current) {
    return  current&&current > moment().endOf('day')
}
const citys=[
    {
        name: '所有渠道',
        value: ''
    },
    {
        name: '打底',
        value: 'FALLBACK_DSP'
    },
    {
        name: 'apidsp',
        value: 'API_DSP'
    },
    {
        name: '推广',
        value: 'POPU_PLAN'
    }
]


class Dashboard extends React.Component {
    constructor(){
        super()
        this.state={
            whenTime:1,
            startValue: moment().subtract(7, 'days'),
            endValue: moment().subtract(1, 'days'),
        }
    }
    componentWillMount(){
        this.props.setAlitaState({ funcName: 'getNoGroupAppList'})
    }
    mediaChange(e){
        console.log(e);
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onBtnChange(e){
        this.setState({whenTime:e.target.value})

    }
    setTime(start,end){
        this.onChange('startValue', moment().subtract(start, 'days'));
        this.onChange('endValue', moment().subtract(end, 'days'));
    }

    render() {
        const { data = {} } = this.props.alitaState.getNoGroupAppList || {};
        console.log(data);
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={3}>
                        <SearchSelect
                            style={{width:'100%'}}
                            placeholder="请选择媒体"
                            onChange={(e)=>this.mediaChange(e)}
                            optionList={data.data} />
                    </Col>
                    <Col className="gutter-row" md={3}>
                        <SearchSelect
                            style={{width:'100%'}}
                            placeholder="请选择渠道"
                            onChange={(e)=>this.mediaChange(e)}
                            optionList={citys} />
                    </Col>
                    <Col md={16} style={{float:'right',display:'flex',justifyContent:'flex-end'}}>
                        <Radio.Group onChange={(e)=>this.onBtnChange(e)} style={{marginRight:10}}>
                            <Radio.Button value={1}>昨天</Radio.Button>
                            <Radio.Button value={7}>过去7天</Radio.Button>
                            <Radio.Button value={30}>过去30天</Radio.Button>
                            <Radio.Button value={0}>自定义</Radio.Button>
                        </Radio.Group>
                        {this.state.whenTime==0?(
                            <RangePicker
                                style={{width:300}}
                                locale={locale}
                                disabledDate={disabledDate}
                                value={[this.state.startValue,this.state.endValue]}
                                onChange={(a)=>this.onRangeChange(a)} />
                        ):null}
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <h2>收藏</h2>
                                        <div className="text-muted">301</div>

                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">收藏</div>
                                        <h2>301</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">云数据</div>
                                        <h2>30122</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">照片</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">邮件</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务</h3>
                                    <small>10个已经完成，2个待完成，1个正在进行中</small>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <Timeline>
                                    <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                                    <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>联调接口</p>
                                        <p>功能验收</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>登录功能设计</p>
                                        <p>权限验证</p>
                                        <p>页面排版</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <ul className="list-group no-border">
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </span>
                                        <div className="clear">
                                            <span className="block">鸣人</span>
                                            <span className="text-muted">终于当上火影了！</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </span>
                                        <div className="clear">
                                            <span className="block">佐助</span>
                                            <span className="text-muted">吊车尾~~</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </span>
                                        <div className="clear">
                                            <span className="block">小樱</span>
                                            <span className="text-muted">佐助，你好帅！</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </span>
                                        <div className="clear">
                                            <span className="block">雏田</span>
                                            <span className="text-muted">鸣人君。。。那个。。。我。。喜欢你..</span>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connectAlita()(Dashboard);