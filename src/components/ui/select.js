const Select = ({ value, onValueChange, children, ...rest }) => (
  <select value={value} onChange={e => onValueChange(e.target.value)} {...rest}>
    {children}
  </select>
);

const SelectTrigger = ({ children, ...rest }) => <>{children}</>;
const SelectValue = (props) => null;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }; 