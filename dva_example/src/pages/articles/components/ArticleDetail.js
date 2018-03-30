import {connect} from 'dva'
import {Icon, Tag} from 'antd'
import {markdown} from 'markdown'
import Link from 'umi/link'
import styles from './ArticleDetail.scss'
import moment from 'moment'

const ArticleDetail = ({record, list}) => {

  function content({content}) {
    return {__html: content ? markdown.toHTML(content) : null}
  }

  return (
    <article className={styles.normal}>
      <h1 className={styles.title}>{record && record.title}</h1>
      <div className={styles.tag}>
        <div className={styles.tag} key='pub'><Icon className={styles.icon} type="calendar"/>{moment(record.pub_date).format('ll')}</div>
        <div className={styles.tag} key='update'><Icon className={styles.icon} type="edit"/>{moment(record.update_time).format('lll')}</div>
        <div className={styles.tag} key='tag'><Tag className={styles.icon} color="#2db7f5">{record.category}</Tag></div>
      </div>
      <hr/>
      <div dangerouslySetInnerHTML={content(record)}/>
      <hr/>
      <h3>相关推荐</h3>
      <ul>
        {list.map(item => (<li key={item.id}><Link to={`/articles/${item.id}`}>{item.title}</Link></li>))}
      </ul>
    </article>
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
