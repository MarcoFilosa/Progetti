import random

def check_win(pc_choice, mossa):
    if pc_choice == mossa:
        print("pari!")
    elif pc_choice != mossa:
        if pc_choice == 'sasso' and mossa == 'forbici':
                print('hai perso')
        elif pc_choice == 'carta' and mossa == 'forbici':
                print('hai vinto')
        elif pc_choice == 'sasso' and mossa == 'carta':
                print('hai vinto')
        elif pc_choice == 'carta' and mossa == 'sasso':
                print('hai perso')
        elif pc_choice == 'forbici' and mossa == 'carta':
                print('hai perso')
        elif pc_choice == 'forbici' and mossa == 'sasso':
                print('hai vinto')

def main():
    choice = ('sasso', 'carta', 'forbici')
    mossa = input('Inserisci la mossa:\n')


    mossa = mossa.rstrip() #pulizia de l'input 
    if mossa == 'exit':
        quit()
    pc_choice = random.choice(choice)
    print(f'il pc ha scelto {pc_choice}')
    check_win(pc_choice, mossa)


#start program
print('Benvenuto a Morra Cinese')
print('puoi scegliere tra: sasso, carta e forbici')
print('Per terminare il gioco digita exit\n\n')
while(True):
    main()
