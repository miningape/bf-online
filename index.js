let cmd = 0;

function readText() {
    let code = $('#editor')[0].value;
    let input =$('#input')[0].value;
    let cells =$('#numCells')[0].value == "" ? 30000 : parseInt($('#numCells')[0].value);
    let terminal = $('.terminal')[0];

    let output = [];
    let pushto = (str) => output.push(str);

    let bf = new BFInterpreter(code, input.match(/./g), cells, pushto) ;
    bf.interpret();

    output = output.join("");
    cmd++;
    terminal.value += cmd.toString() + ": " + output + '\n';
}

function preLoad() {
    let choice = $('#preload')[0].value;
    let code = $('#editor')[0];

    switch(choice) {
        case "0":
            code.value = BLANK;
            break;
        case "1":
            code.value = HELLO;
            break;
        case "2":
            code.value = HEXPL;
            break;
        case "3":
            code.value = INTER;
            break;
        default: throw("Unknown Command")
    }
}

const HELLO = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
const BLANK = "";
const HEXPL = " 1 +++++ +++               Set Cell #0 to 8\n\
2 [\n\
3     >++++               Add 4 to Cell #1; this will always set Cell #1 to 4\n\
4     [                   as the cell will be cleared by the loop\n\
5         >++             Add 4*2 to Cell #2\n\
6         >+++            Add 4*3 to Cell #3\n\
7         >+++            Add 4*3 to Cell #4\n\
8         >+              Add 4 to Cell #5\n\
9         <<<<-           Decrement the loop counter in Cell #1\n\
10     ]                   Loop till Cell #1 is zero\n\
11     >+                  Add 1 to Cell #2\n\
12     >+                  Add 1 to Cell #3\n\
13     >-                  Subtract 1 from Cell #4\n\
14     >>+                 Add 1 to Cell #6\n\
15     [<]                 Move back to the first zero cell you find; this will\n\
16                         be Cell #1 which was cleared by the previous loop\n\
17     <-                  Decrement the loop Counter in Cell #0\n\
18 ]                       Loop till Cell #0 is zero\n\
19 \n\
20 The result of this is:\n\
21 Cell No :   0   1   2   3   4   5   6\n\
22 Contents:   0   0  72 104  88  32   8\n\
23 Pointer :   ^\n\
24 \n\
25 >>.                     Cell #2 has value 72 which is 'H'\n\
26 >---.                   Subtract 3 from Cell #3 to get 101 which is 'e'\n\
27 +++++ ++..+++.          Likewise for 'llo' from Cell #3\n\
28 >>.                     Cell #5 is 32 for the space\n\
29 <-.                     Subtract 1 from Cell #4 for 87 to give a 'W'\n\
30 <.                      Cell #3 was set to 'o' from the end of 'Hello'\n\
31 +++.----- -.----- ---.  Cell #3 for 'rl' and 'd'\n\
32 >>+.                    Add 1 to Cell #5 gives us an exclamation point\n\
33 >++.                    And finally a newline from Cell #6";

const INTER = ">>>+[[-]>>[-]++>+>+++++++[<++++>>++<-]++>>+>+>+++++[>++>++++++<<-]+>>>,<++[[>[->>]<[>>]<<-]<[<]<+>>[>]>[<+>-[[<+>-]>]<[[[-]<]++<-[<+++++++++>[<->-]>>]>>]]<<]<]<[[<]>[[>]>>[>>]+[<<]<[<]<+>>-]>[>]+[->>]<<<<[[<<]<[<]+<<[+>+<<-[>-->+<<-[>+<[>>+<<-]]]>[<+>-]<]++>>-->[>]>>[>>]]<<[>>+<[[<]<]>[[<<]<[<]+[-<+>>-[<<+>++>-[<->[<<+>>-]]]<[>+<-]>]>[>]>]>[>>]>>]<<[>>+>>+>>]<<[->>>>>>>>]<<[>.>>>>>>>]<<[>->>>>>]<<[>,>>>]<<[>+>]<<[+<<]<]";