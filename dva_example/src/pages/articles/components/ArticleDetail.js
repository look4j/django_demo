import {connect} from 'dva'
import {Card} from 'antd'
import {markdown} from 'markdown'
import styles from './ArticleDetail.css'

const ArticleDetail = ({record}) => {

  function title(record) {
    return <h1>{record && record.title}</h1>
  }

  function content(record) {
    const content = record ? record.content : ''
    return {__html: markdown.toHTML(content)}
  }

  return (
    <div className={styles.normal}>
      <Card title={title(record)}>
        <div dangerouslySetInnerHTML={content(record)}/>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  const {record} = state.article;
  return {
    record,
    loading: state.loading.models.article
  };
}

export default connect(mapStateToProps)(ArticleDetail);
