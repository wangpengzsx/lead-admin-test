/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {PwaInstaller} from '../widget';
import {connectAlita} from 'redux-alita';
import {postOauthlogin} from './../../axios';


const FormItem = Form.Item;


class Login extends React.Component {
    componentDidMount() {
        const {setAlitaState} = this.props;
        setAlitaState({stateName: 'auth', data: null});
    }

    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const {auth: nextAuth = {}} = this.props.alitaState;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            this.props.history.push({pathname: '/'});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {setAlitaState} = this.props;
                postOauthlogin(values).then(res => {
                    setAlitaState({stateName: 'auth', data: {uid: res.data.id}})
                    setAlitaState({stateName: 'aaa', data: {uid: res.data}})

                })
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        console.log(this.props.alitaState);
        const {count = {},count1={}} = this.props.alitaState;
        const {data: countNum = 0} = count;
        const {data: countNum1 = 0} = count1;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>React Admin</span>
                        <PwaInstaller/>
                    </div>
                    <button onClick={() => this.props.setAlitaState({ stateName: 'count', data: countNum + 1 })}>{countNum} + 1</button>
                    <button onClick={() => this.props.setAlitaState({ stateName: 'count', data: countNum - 1 })}>{countNum}- 1</button>
                    <button onClick={() => this.props.setAlitaState({ stateName: 'count1', data: countNum1 + 1 })}>{countNum1}- 1</button>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="管理员输入admin, 游客输入guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="管理员输入admin, 游客输入guest"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>或 现在就去注册!</span>
                                <span onClick={this.gitHub}><Icon type="github"/>(第三方登录)</span>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita()(Form.create()(Login));
