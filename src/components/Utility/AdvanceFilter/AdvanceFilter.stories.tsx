import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { AdvanceDateFilterStories } from "./AdvanceDateFilter/AdvanceFilterDate.stories";
import { AdvanceDateRangeFilterStories } from "./AdvanceDateRangeFilter/AdvanceDateRangeFilter.stories";
import { AdvanceIdFilterStories } from "./AdvanceIdFilter/AdvanceIdFilter.stories";
import { AdvanceNumberFilterStories } from "./AdvanceNumberFilter/AdvanceNumberFilter.stories";
import { AdvanceNumberRangeFilterStories } from "./AdvanceNumberRangeFilter/AdvanceNumberRangeFilter.stories";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";
import { AdvanceTreeFilterStories } from "./AdvanceTreeFilter/AdvanceTreeFilter.stories";


storiesOf('AdvanceFilter', module)
    .add(nameof(AdvanceNumberFilterStories), AdvanceNumberFilterStories)
    .add(nameof(AdvanceStringFilterStories), AdvanceStringFilterStories)
    .add(nameof(AdvanceIdFilterStories), AdvanceIdFilterStories)
    .add(nameof(AdvanceDateFilterStories), AdvanceDateFilterStories)
    .add(nameof(AdvanceDateRangeFilterStories), AdvanceDateRangeFilterStories)
    .add(nameof(AdvanceNumberRangeFilterStories), AdvanceNumberRangeFilterStories)
    .add(nameof(AdvanceTreeFilterStories), AdvanceTreeFilterStories);