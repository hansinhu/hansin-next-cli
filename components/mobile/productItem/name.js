/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react';
import Link from 'next/link';



class ProductsName extends Component {

  render() {
    const {
      name,
      itemId
    } = this.props;
    return(
      <Link href={'/detail?itemId='+itemId} as={'/detail?itemId='+itemId}>
          <a ><p className="product-name" title={name}>{name}</p></a>
        </Link>
      )
    {/*if (name && name.length > 45) {
      return (
        <Link href={'/detail?itemId='+itemId} as={'/detail?itemId='+itemId}>
          <a ><p title={name}>{name.substring(0,45)+"..."}</p></a>
        </Link>

      )
    } else {
      return (
        <Link href={'/detail?itemId='+itemId} as={'/detail?itemId='+itemId}>
          <a ><p title={name}>{name}</p></a>
        </Link>

      )
    }*/}

  }
}


export default ProductsName