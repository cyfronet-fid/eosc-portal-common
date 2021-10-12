import uniqueId from "lodash-es/uniqueId";
import PropTypes from "prop-types";
import { Component } from "preact";
import usePropTypes from "../../core/utils";

export default class EoscMainHeaderBtn extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  };

  render(props) {
    const { url, label, isActive } = usePropTypes(props, EoscMainHeaderBtn);
    return (
      <li key={uniqueId("eosc-main-header-li")}>
        <a className={isActive ? "active" : ""} href={url}>
          {label}
        </a>
      </li>
    );
  }
}
