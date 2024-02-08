// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).
document.addEventListener('DOMContentLoaded', () => {

  // кнопка открытия формы добавить студента
  const buttonAddStudent = document.querySelector('.button-add');
  const buttonSaveStudent = document.querySelector('.form-add__button-save');
  const formAddStudent = document.querySelector('.form-add');
  buttonAddStudent.addEventListener('click', function () {
    formAddStudent.classList.toggle('form-add_active');
  });

  //валидация формы

  let allInputsForm = document.querySelectorAll('.form-input');
  let formAddSurname = document.querySelector('.form-add__surname');
  let formAddName = document.querySelector('.form-add__name');
  let formAddSurname2 = document.querySelector('.form-add__surname2');
  let formAddFakultet = document.querySelector('.form-add__fakultet');
  let formAddAge = document.querySelector('.form-add__age');
  let formAddYear = document.querySelector('.form-add__year');
  let errors = document.querySelectorAll('.error');



  formAddAge.addEventListener("input", function (e) {
    let inputDate = new Date(this.value); // дата из инпута
    if (inputDate.getFullYear() < 1990) {
      console.log('menshe')
    } else {
      console.log('bolshe')
    }
  })

//добавить валидацию всем инпутам
function addValidation(inputsArray, errorsArray) {
  for (let item of inputsArray) {
    let itForValidation;
    item.addEventListener("input", function (event) {
      itForValidation = this.name;
      if (item.validity.valid) {
        // Если на момент валидации какое-то сообщение об ошибке уже отображается,
        // если поле валидно, удаляем сообщение
        for (let i of errorsArray) {
          if (i.dataset.parent == itForValidation) {
            i.textContent = "";
            i.className = "error";
            //formAddStudent.addEventListener("submit", function (event) {

            //  formAddStudent.submit();
            // })
          }
        }
      } else {
        for (let i of errorsArray) {
          if (i.dataset.parent == itForValidation) {
            // Если поле не валидно, показываем правильную ошибку
            showError1(item, i);
            console.log("no otpr")
            //formAddStudent.addEventListener("submit", function (event) {

            //  event.preventDefault();
            // })
          }
        }
      }
    })
  }
}
addValidation(allInputsForm, errors);


buttonSaveStudent.addEventListener("click", function (event) {

  // Если поле валидно, позволяем форме отправляться

  if (!formAddStudent.checkValidity()) {
    event.preventDefault();
    console.log("no valid")
    // Если поле не валидно, отображаем соответствующее сообщение об ошибке
    addValidation(allInputsForm, errors);
  } else {
    formAddSurname.value.trim();
    console.log("valid")
  }
});

function showError1(what, error) {
  if (what.validity.valueMissing) {
    // Если поле пустое,
    // отображаем следующее сообщение об ошибке
    error.textContent = "Вы не ввели значение";

  } else if (what.validity.tooShort) {
    // Если содержимое слишком короткое,
    // отображаем следующее сообщение об ошибке
    error.textContent = `Вы должны ввести минимум ${what.minLength} символов; Вы ввели ${what.value.length}.`;
  }

  // Задаём соответствующую стилизацию
  error.className = "error active";
}

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  //  объекты студентов
  {
    id: 1,
    surname: 'Никитин',
    name: 'Человек',
    surname2: 'Васильевич',
    fakultet: 'ПОИТ', birthday: new Date(2001, 3, 15), godObychenia: 2020,
  },
  {
    id: 2,
    surname: 'Никитинbbbbbbbb',
    name: 'Человекbbbbb',
    surname2: 'Васильевичbbbbb', fakultet: 'ИТиКЕ', birthday: new Date(2000, 11, 13), godObychenia: 2019,
  },
]
let container = document.getElementById('container');
//создаем и возвращаем список элементов
function createList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

// сколько студентов, столько и li
function createItem(listArray) {
  for (let item of listArray) {
    // вызов функции вывода одного студента
    getStudentItem(item);
  }
}
createItem(studentsList);
/*
  //получить каждого студента
  function getStugentObj(listArray) {
    listArray = studentsList;
    let container = document.getElementById('container');
    let listStudents = createList();
    let item;
    for (const itemList of listArray) {
      item = createItem(itemList);
      //listStudents.append(itemList);
      //item.textContent = itemList.fio;
      console.log(item);
    };
    container.append(listStudents);

    return {
      container,
      listStudents,
      item,
    };

  }

  getStugentObj();*/
// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
  let listStudents = createList();
  let li = document.createElement('li');

  for (let i in studentObj) {
    let span = document.createElement('span');
    span = studentObj[i];
    li.append(span);
  }
  listStudents.append(li);
  container.append(listStudents);
}

// узнать др и вывести в норм формате
function getBirthday() {

  let now = new Date(); //Текущ дата
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущ дата без времени
  let dob = new Date(1997, 9, 4); //Дата рождения
  let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
  let age; //Возраст

  //Возраст = текущий год - год рождения
  age = today.getFullYear() - dob.getFullYear();
  //Если ДР в этом году ещё предстоит, то вычитаем из age один год
  if (today < dobnow) {
    age = age - 1;
  }

  console.log(age, `  лет`);
}
getBirthday();

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {

}

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.


  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
})


/* сортировка
// по имени (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
Можем ли мы сделать его короче, например вот таким?

users.sort(byField('name'));
users.sort(byField('age'));
*/





