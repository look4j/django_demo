import {connect} from 'dva'
import {Card, List} from 'antd'
import {markdown} from 'markdown'
import Link from 'umi/link'
import styles from './ArticleDetail.css'

const ArticleDetail = ({record, list}) => {

  function title(record) {
    return <h1>{record && record.title}</h1>
  }

  function content(record) {
    const content = record ? record.content : ''
    return {__html: markdown.toHTML(content)}
  }

  return (
    <div className={styles.normal}>
      <div>{title(record)}</div>
      <div dangerouslySetInnerHTML={content(record)}/>
      <hr />
      <h3>相关推荐</h3>
      <ul>
        {list.map(item => (<li><Link to={`/articles/${item.id}`}>{item.title}</Link></li>))}
      </ul>
    </div>
  )
}

function mapStateToProps(state) {
  const {record, list} = state.article;
  return {
    list,
    record,
    loading: state.loading.models.article
  };
}

export default connect(mapStateToProps)(ArticleDetail);
