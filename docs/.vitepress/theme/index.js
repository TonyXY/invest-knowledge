import DefaultTheme from 'vitepress/theme'
import './custom.css'
import TraderTypeTest from './components/TraderTypeTest.vue'
import InteractiveChecklist from './components/InteractiveChecklist.vue'
import AccordionGroup from './components/AccordionGroup.vue'
import ScenarioQuiz from './components/ScenarioQuiz.vue'
import PositionCalculator from './components/PositionCalculator.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TraderTypeTest', TraderTypeTest)
    app.component('InteractiveChecklist', InteractiveChecklist)
    app.component('AccordionGroup', AccordionGroup)
    app.component('ScenarioQuiz', ScenarioQuiz)
    app.component('PositionCalculator', PositionCalculator)
  }
}
