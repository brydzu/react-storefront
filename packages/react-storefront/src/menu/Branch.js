import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Collapse from '@material-ui/core/Collapse'
import classnames from 'classnames'
import ItemContent from './ItemContent'
import Item from './Item'

@inject('app')
@observer
export default class Branch extends Component {
  render() {
    let {
      app: { menu },
      classes,
      useExpanders,
      simple,
      depth,
      item
    } = this.props

    const showExpander = simple || (depth > 0 && useExpanders)

    const elements = [
      <MenuItem
        key="item"
        button
        divider
        onClick={
          showExpander
            ? this.toggleItemExpaned.bind(this, item)
            : this.slideToItem.bind(this, item, menu)
        }
        classes={{
          root: classnames(classes.listItem, item.className, {
            [classes.expanded]: item.expanded,
            [classes.expander]: showExpander
          })
        }}
      >
        <ItemContent {...this.props} item={item} leaf={false} showExpander={showExpander} />
      </MenuItem>
    ]

    if (showExpander) {
      elements.push(
        <Collapse in={item.expanded} timeout="auto" key="collapse">
          <MenuList component="div" classes={{ root: classes.list }}>
            {item.items &&
              item.items.map((item, i) => (
                <Item {...this.props} depth={depth + 1} item={item} key={i} />
              ))}
          </MenuList>
        </Collapse>
      )
    }

    return <Fragment>{elements}</Fragment>
  }

  slideToItem = (item, menu) => {
    const { expandFirstItem } = this.props
    menu.setSelected(item, { expandFirstItem })
  }

  toggleItemExpaned = item => {
    item.toggle()
  }
}
