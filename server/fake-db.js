const Product = require('./model/product')

class FakeDb{

    constructor(){
        this.product = [
            {
                coverImage: 'assets/img/phone-cover.jpg',
                name: 'Phone XL',
                price: 799,
                description: 'A large phone with one of the best screens',
                heading1: 'サンプルテキスト1',
                heading2: 'サンプルテキスト2',
                heading3: 'サンプルテキスト3',
                headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
                headingtext2: 'テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章',
                headingtext3: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
              },
              {
                coverImage: 'assets/img/phone-cover.jpg',
                name: 'Phone Mini',
                price: 699,
                description: 'A great phone with one of the best cameras',
                heading1: 'サンプルテキスト1',
                heading2: 'サンプルテキスト2',
                heading3: 'サンプルテキスト3',
                headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
                headingtext2: 'テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章',
                headingtext3: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
              },
              {
                coverImage: 'assets/img/phone-cover.jpg',
                name: 'Phone Standard',
                price: 299,
                description: '',
                heading1: 'サンプルテキスト1',
                heading2: 'サンプルテキスト2',
                heading3: 'サンプルテキスト3',
                headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
                headingtext2: 'テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章',
                headingtext3: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
              },
              {
                name: 'Phone Special',
                coverImage: 'assets/img/phone-cover.jpg',
                price: 999,
                description: '',
                heading1: 'サンプルテキスト1',
                heading2: 'サンプルテキスト2',
                heading3: 'サンプルテキスト3',
                headingtext1: 'サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト',
                headingtext2: 'テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章テキスト文章',
                headingtext3: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
              }
        ];
    }

    async initDb(){
        await this.cleanDb()
        this.pushProductsToDb()
    }

    async cleanDb(){
        await Product.deleteMany({})
    }

    pushProductsToDb(){
        this.product.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save()
            }
        )
    }

    seeDb(){
        this.pushProductsToDb()
    }
}

module.exports = FakeDb