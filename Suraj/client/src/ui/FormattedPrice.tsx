
const FormattedPrice = ({ amount }: { amount?: number }) => {
    const formattedAmount = new Number(amount).toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
    });
    return <span>{formattedAmount}</span>;
  };
  
  export default FormattedPrice;
  