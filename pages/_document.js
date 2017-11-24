import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'

const moDeCss = '../static/css/skin/mobile-default/index.css';
const pcDeCss = '../static/css/skin/pc-default/index.css';
const InitCss = (device) => {
  switch (device) {
    case 'mobile':
      return moDeCss;
      break;
    case 'pc':
      return pcDeCss;
      break;
    default:
      return null
  }
}


export default class MyDocument extends Document {
  static getInitialProps({
    renderPage
  }) {
    const {
      html,
      head,
      errorHtml,
      chunks
    } = renderPage()
    return {
      html,
      head,
      errorHtml,
      chunks
    }
  }


  render() {
    const initialState = this.props.__NEXT_DATA__.props.initialState;
    const device = initialState ? initialState.home.device : '';
    //const isIe = initialState ? initialState.home.isIeBrowser : '';
    const deCss = InitCss(device)
    return (
      <html>
        <Head>
          <title>My page</title>
          {/*<link rel='stylesheet' href={deCss} />*/}
          {/*<link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet"/>*/}
        </Head>
        <body>
          <div className='root'>
            <Main />
          
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}