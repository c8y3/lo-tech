// TODO try to avoid the imports? Easy for lotech
//      could just be automatically generated from the missing class names for the others (or have a syntax of the type: extern Row;
import lotech from '/lotech';
import Row from '/Row';

<div>
    <ProductRow class="headers" name="Name" price="Price">
    </ProductRow>
</div>

ProductCategoryRow =
<Row class="headers">
    {category}
</Row>

ProductRow =
<Row>
    <lotech.Span class="name {isMissing}">{Name}</lotech.Span>
    <lotech.Span>{Price}</lotech.Span>
</Row>

