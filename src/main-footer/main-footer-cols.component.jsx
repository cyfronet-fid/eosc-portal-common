import PropTypes from "prop-types";
import { Component, Fragment } from "preact";
import { environment } from "../../env/env";
import { usePropTypes } from "../../core/utils";

export default class EoscMainFooterCols extends Component {
  static propTypes = {
    cols: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          url: PropTypes.string,
          navBtns: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired
            })
          ).isRequired
        })
      )
    ),
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string
  };

  static defaultProps = {
    cols: environment.mainFooterConfig.cols
  };

  renderLink(link, props) {
    const type = link.type ?? "link";
    if (type === "link") {
      return (<li>{link.url ? <a href={link.url}>{link.label}</a> : link.label}</li>);
    } else if (type === "termsOfUse" && props.termsOfUse) {
      return (<li><a href={props.termsOfUse}>{link.label}</a></li>);
    } else if (type === "privacyPolicy" && props.privacyPolicy) {
      return (<li><a href={props.privacyPolicy}>{link.label}</a></li>);
    }
    return null;
  }

  render(props) {
    const propsValidated = usePropTypes(props, EoscMainFooterCols);
    const cols = propsValidated.cols;
    return (
      <div className="row mt-5 pb-2">
        {cols.map((col) => (
          <div className="col-md">
            {col.map((list) => (
              <ul>
                <li>
                  <div className="title">{list.url ? <a href={list.url}>{list.label}</a> : list.label}</div>
                </li>
                {!!list.navBtns && list.navBtns.length > 0 ? (
                  list.navBtns.map((btn) => this.renderLink(btn, propsValidated))
                ) : (
                  <Fragment />
                )}
              </ul>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
