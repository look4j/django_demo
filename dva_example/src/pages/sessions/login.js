import React from 'react'
import {connect} from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './login.css'
const  FormItem = Form.Item

const Login = ({loading, dispatch, form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'sessions/login', payload: values })
    })
  }

  return (
    <div className={styles.box}>
      <form className={styles.form}>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading}>
            Sign in
          </Button>
        </Row>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.sessions
  };
}

export default connect(mapStateToProps)(Form.create()(Login));
