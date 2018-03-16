import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import {routerRedux} from 'dva/router';
import moment from 'moment'
import styles from './Articles.css';
import {PAGE_SIZE} from '../constants'
import ArticleModal from './ArticleModal'
window.moment = moment
function Articles({dispatch, list: dataSource, loading, total, page: current}) {
  function deleteHandler(id) {
    dispatch({
      type: 'articles/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/articles',
      query: {page},
    }));
  }

  function createHandler(values) {
    dispatch({
      type: 'articles/create',
      payload: values,
    });
  }

  function editHandler(id, values) {
    dispatch({
      type: 'articles/patch',
      payload: {id, values},
    });
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Pub date',
      dataIndex: 'pub_date',
      key: 'pub_date',
      render: text => <span>{moment(text).format('ll')}</span>,
    },
    {
      title: 'Update time',
      dataIndex: 'update_time',
      key: 'update_time',
      render: text => <span>{moment(text).format('lll')}</span>,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
                   <ArticleModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </ArticleModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <ArticleModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Article</Button>
          </ArticleModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, total, page} = state.articles;
  return {
    list,
    total,
    page,
    loading: state.loading.models.articles
  };
}

export default connect(mapStateToProps)(Articles);