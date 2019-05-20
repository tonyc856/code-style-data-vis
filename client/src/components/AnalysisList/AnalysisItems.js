export const summaryItem = {
  name: "Summary",
  codeExample: undefined
};

export const listItems = [
  {
    name: "Tabs vs. Space",
    property: "tabs_vs_spaces_analysis",
    summaryProperty: "tabs_vs_spaces",
    labels: ["Spaces", "Tabs"],
    codeExample: {
      correct: 'def long_function_name(var_one):\n' +
        '    print(var_one)',
      incorrect: 'def long_function_name(var_one):\n' +
        '\t# uses tabs instead of spaces\n' +
        '\tprint(var_one)'
    },
    parent: null
  },
  {
    name: "Line Length",
    property: "line_length_analysis",
    summaryProperty: "line_length",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: '# Limit all lines of code to a maximum of 79 characters',
      incorrect: '# Lines of code are greater than 79 characters'
    },
    parent: null
  },
  {
    name: "Blank Lines",
    property: "blank_lines_analysis",
    summaryProperty: "blank_lines",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: 'spam(ham[1], {eggs: 2})\n' +
        '    if x == 4: print x, y; x, y = y, x\n' +
        '    spam(1)\n' +
        "    dict['key'] = list[index]\n" +
        '    x = 1\n' +
        '    y = 2\n' +
        '    long_variable = 3',
      incorrect: 'spam( ham[ 1 ], { eggs: 2 })\n' +
        '    if x == 4 : print x, y ; x , y = y , x\n' +
        '    spam (1) \n' +
        "    dict ['key'] = list [index]\n" +
        '    x             = 1\n' +
        '    y             = 2\n' +
        '    long_variable = 3'
    },
    parent: null
  },
  {
    name: "Imports",
    property: "import_analysis",
    summaryProperty: "import",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: 'import os\n' +
        'import sys',
      incorrect: 'import sys, os'
    },
    parent: null
  },
  {
    name: "Indentation",
    property: "indentation_analysis",
    summaryProperty: "indentation",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: '# Aligned with opening delimiter\n' +
        'foo = long_function_name(var_one, var_two,\n' +
        '                         var_three, var_four)',
      incorrect: '# Arguments on first line forbidden when not using vertical alignment.\n' +
        'foo = long_function_name(var_one, var_two,\n' +
        '    var_three, var_four)'
    },
    parent: null
  },
  {
    name: "Class Naming",
    property: "classes",
    summaryProperty: "naming",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: '# Class names should normally use the CapWords convention\n' +
        'class MyClass:\n' +
        '    x = 5',
      incorrect: 'class myclass:\n' +
        '    x = 5'
    },
    parent: "naming_analysis"
  },
  {
    name: "Function Naming",
    property: "functions",
    summaryProperty: "naming",
    labels: ["Files Passed", "Files Failed"],
    codeExample: {
      correct: '# Function names should be lowercase, with words separated by underscores\n' +
        'def my_function():\n' +
        '    ...',
      incorrect: 'def myFunction():\n' +
        '    ...'
    },
    parent: "naming_analysis"
  }
];
