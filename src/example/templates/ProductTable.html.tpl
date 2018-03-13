// TODO try to avoid the imports? Easy for lotech
//      could just be automatically generated from the missing class names for the others (or have a syntax of the type: extern Row;
import lotech from '/lotech';
import Row from '/Row';

<lotech.Div>
    <ProductRow class="headers">
        <Name>Name</Name>
        <Price>Price</Price>
    </ProductRow>
</lotech.Div>

ProductCategoryRow =
<Row class="headers">
    {category}
</Row>

ProductRow =
<Row>
    <lotech.Span key="productName" class="name">{Name}</lotech.Span>
    <lotech.Span>{Price}</lotech.Span>
</Row>

