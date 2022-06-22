
import styles from "./Checkbox.module.css"


function Checkbox({children, style, required=false, checked, onChange, invalid=false}) {
    
    return (
        <label className={styles.container} style={style}>
            {children}
            <input required={required} type="checkbox" checked={checked} onChange={onChange} />
            <span className={styles.checkmark}></span>
        </label>
    )
}

export default Checkbox
