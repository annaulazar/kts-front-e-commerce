import Button from "components/Button";

import styles from "./Search.module.scss";
import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";

type SearchProps = {
  value: string;
  onSearch: (query: string) => void;
  onClick: (query: string) => void;
};
export const Search = ({ value, onSearch, onClick }: SearchProps) => {

  return (
      <div className={styles.search}>
        <div className={styles.search__bar}>
          <Input
            className={styles.search__input}
            // value={value}
            onChange={onSearch}
            placeholder={"Search product"}
          />
          <Button
            className={styles["search__button"]}
            loading={false}
            type={"submit"}
            onClick={onClick}
          >
            Find now
          </Button>
        </div>
        <MultiDropdown
          className={styles.search__dropdown}
          options={[]}
          value={[]}
          onChange={() => {}}
          getTitle={() => 'Filter'}
        />
      </div>
  );
};
