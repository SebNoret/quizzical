import { getData, setData, userDataExists } from "../utils";

class QuestionListDataManager {
  static getQuestionsList() {
    if (!userDataExists()) {
      return false;
    }
    const userData = getData();
    return userData.questionsList;
  }
  static removeQuestionsList() {
    const userData = getData();
    const newUserData = {
      ...userData,
      questionsList: [],
    };
    setData("userData", newUserData);
    return true;
  }

  static saveQuestionsList(questionsList) {
    const userData = getData();
    const newUserData = {
      ...userData,
      questionsList: questionsList,
    };
    setData("userData", newUserData);
    return true;
  }

  static questionsListExists() {
    const userData = getData();
    if (
      !userData.hasOwnProperty("questionsList") ||
      userData.questionsList.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export default QuestionListDataManager;
