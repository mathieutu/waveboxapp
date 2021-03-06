import React from 'react'
import PropTypes from 'prop-types'
import { mailboxActions, GoogleDefaultServiceReducer } from 'stores/mailbox'
import WizardConfigureUnreadModeOption from './WizardConfigureUnreadModeOption'
import GoogleDefaultService from 'shared/Models/Accounts/Google/GoogleDefaultService'
import WizardConfigureDefaultLayout from './WizardConfigureDefaultLayout'
import { withStyles } from '@material-ui/core/styles'
import yellow from '@material-ui/core/colors/yellow'
import lightBlue from '@material-ui/core/colors/lightBlue'
import cyan from '@material-ui/core/colors/cyan'

const styles = {
  // Typography
  heading: {
    fontWeight: 300,
    marginTop: 40
  },
  subHeading: {
    fontWeight: 300,
    marginTop: -10,
    fontSize: 16
  },
  extraSubHeading: {
    fontWeight: 300,
    fontSize: 14
  },

  // Unread
  unreadOptions: {
    marginTop: 40,
    marginBottom: 40
  },
  unreadOption: {
    display: 'inline-block',
    verticalAlign: 'top'
  },

  // Popover
  popoverContainer: {
    maxWidth: 320
  },
  popoverPreviewImage: {
    maxWidth: '100%',
    margin: '0px auto',
    display: 'block'
  }
}

@withStyles(styles)
class WizardConfigureGmail extends React.Component {
  /* **************************************************************************/
  // Class
  /* **************************************************************************/

  static propTypes = {
    mailbox: PropTypes.object.isRequired,
    onRequestCancel: PropTypes.func.isRequired
  }

  /* **************************************************************************/
  // UI Events
  /* **************************************************************************/

  /**
  * Handles a mode being picked by updating the mailbox
  * @param unreadMode: the picked unread mode
  */
  handleModePicked = (unreadMode) => {
    const { mailbox } = this.props
    mailboxActions.reduceService(mailbox.id, GoogleDefaultService.type, GoogleDefaultServiceReducer.setUnreadMode, unreadMode)
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  render () {
    const { mailbox, onRequestCancel, classes, ...passProps } = this.props
    const unreadMode = mailbox.defaultService.unreadMode

    return (
      <WizardConfigureDefaultLayout
        onRequestCancel={onRequestCancel}
        mailboxId={mailbox.id}
        {...passProps}>
        <h2 className={classes.heading}>Choose your Inbox mode</h2>
        <p className={classes.subHeading}>
          Your Gmail account uses one of the following modes to organise your inbox.
          Select the one that matches your existing settings. Don't worry if you don't know
          what it is you can change it later!
        </p>
        <div className={classes.unreadOptions}>
          <WizardConfigureUnreadModeOption
            className={classes.unreadOption}
            color={yellow[700]}
            selected={unreadMode === GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD_PERSONAL}
            onSelected={() => this.handleModePicked(GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD_PERSONAL)}
            name='Categories'
            popoverContent={(
              <div className={classes.popoverContainer}>
                <h3>Categories Inbox</h3>
                <img className={classes.popoverPreviewImage} src='../../images/gmail_inbox_categories_small.png' />
                <p>
                  Your new emails are automatically sorted into Categories such as <em>Social</em>
                  and <em>Promotions</em> when they arrive. Typically you will see a number of
                  category tabs above your emails
                </p>
              </div>
            )} />
          <WizardConfigureUnreadModeOption
            className={classes.unreadOption}
            color={lightBlue[700]}
            selected={unreadMode === GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD}
            onSelected={() => this.handleModePicked(GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD)}
            name='Unread'
            popoverContent={(
              <div className={classes.popoverContainer}>
                <h3>Unread Inbox</h3>
                <img className={classes.popoverPreviewImage} src='../../images/gmail_inbox_unread_small.png' />
                <p>
                  Your new emails are sent directly to your Inbox and are not automatically sorted
                  into categories or ranked by priority. Typically the title you see above
                  your emails is <em>Unread</em>.
                </p>
              </div>
            )} />
          <WizardConfigureUnreadModeOption
            className={classes.unreadOption}
            color={cyan[700]}
            selected={unreadMode === GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD_IMPORTANT}
            onSelected={() => this.handleModePicked(GoogleDefaultService.UNREAD_MODES.INBOX_UNREAD_IMPORTANT)}
            name='Priority'
            popoverContent={(
              <div className={classes.popoverContainer}>
                <h3>Priority Inbox</h3>
                <img className={classes.popoverPreviewImage} src='../../images/gmail_inbox_priority_small.png' />
                <p>
                  Your new emails are either marked as important or not and the important
                  emails are split into their own section when they arrive. Typically the title you see above
                  your emails is <em>Important and unread</em>.
                </p>
              </div>
            )} />
        </div>
        <p className={classes.extraSubHeading}>Hover over each choice for more information</p>
      </WizardConfigureDefaultLayout>
    )
  }
}

export default WizardConfigureGmail
