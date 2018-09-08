import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { formatDate } from '@dojo/framework/i18n/date';
import Calendar from '@dojo/widgets/calendar';
import EnhancedTextInput from '@dojo/widgets/enhanced-text-input';

import * as css from './styles/datePicker.m.css';

interface DatePickerProperties {
  selectedDate: Date;
}

export class DatePicker extends WidgetBase<DatePickerProperties> {
  state = {
    month: 1,
    selectedDate: this.properties.selectedDate,
    year: 2018,
    visible: false
  };

  protected render() {
    return v('div', { classes: css.root }, [
      w(EnhancedTextInput, {
        addonAfter: [
          v(
            'button',
            {
              onclick: () => {
                this.setState({ visible: !this.state.visible });
              }
            },
            [
              v('i', {
                classes: [
                  'fa',
                  this.state.visible ? 'fa-chevron-up' : 'fa-chevron-down'
                ]
              })
            ]
          )
        ],
        label: 'Pick a date',
        value: formatDate(
          this.state.selectedDate || this.properties.selectedDate,
          { date: 'short' }
        )
      }),
      v(
        'section',
        {
          classes: [this.state.visible ? '' : css.hidden, css.calendarcontainer]
        },
        [
          w(Calendar, {
            month: this.state.month,
            selectedDate: this.state.selectedDate,
            year: this.state.year,
            onMonthChange: (month: number) => {
              this.setState({ month: month });
            },
            onYearChange: (year: number) => {
              this.setState({ year: year });
            },
            onDateSelect: (date: Date) => {
              this.setState({ selectedDate: date });
            }
          })
        ]
      )
    ]);
  }

  protected setState(state: any) {
    this.state = { ...this.state, ...state };
    this.invalidate();
  }
}

export default DatePicker;
