const menuSections = [
  { id: 'cocktails', title: 'Classic Italian Cocktails & Martinis', sub: null, note: '$19 Each Unless Noted' },
  { id: 'dessert-cocktails', title: 'Dessert & Specialty Cocktails', sub: null, note: null },
  { id: 'mocktails', title: 'Italian Mocktails', sub: 'Non-Alcoholic', note: '$11 Each' },
  { id: 'antipasti', title: 'Antipasti', sub: 'Appetizers', note: null },
  { id: 'salads', title: 'Insalate e Zuppe', sub: 'Salads & Soups', note: 'Add to any salad: Chicken $10 · Salmon $16 · Colossal Tiger Prawns $6.50 ea · 10oz Sirloin $18' },
  { id: 'sides', title: 'Al Lato', sub: 'Sides', note: null },
  { id: 'specialties', title: 'Specialties della Casa', sub: 'Steaks, Veal, Poultry & Seafood', note: 'Add Tiger Prawns $6.50 ea · Zip Sauce $4 · Creamy Peppercorn $5 · Herb Butter $4 · Demi-Glace $4' },
  { id: 'pasta', title: 'Pasta & Healthy Specialties', sub: 'Including Vegan & Gluten-Free Options', note: 'Add to any pasta: Chicken $10 · Salmon $16 · Tiger Prawns $6.50 ea · Sirloin $18 · Meatballs $5 ea · Sausage $4 ea' },
  { id: 'pizza', title: 'Pizzas', sub: null, note: 'Medium 14" / Large 16" · Additional Toppings $3 Each · Add Chicken $10' },
  { id: 'sandwiches', title: 'Sandwiches', sub: 'Lunch Menu · Served with House-Made Pasta Salad or French Fries', note: null },
];

const fullMenu = [
  // Classic Italian Cocktails & Martinis
  { category: 'cocktails', name: 'Godmother', description: 'Grey Goose Vodka & Disaronno on the Rocks', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Milano Mule', description: "Tito's Vodka, Limoncello & Ginger Beer with a Lime Wedge", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Venetian Spritz', description: 'Prosecco, Aperol Aperitif & Club Soda with an Orange Slice', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Sangria Rosso', description: 'Chianti Red Wine, Blackberry Brandy, a Splash of Soda & Orange Juice with an Orange Slice & a Cherry', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bootlegger Old Fashioned', description: "Taffer's Browned Butter Bourbon, Bitters & Simple Syrup with an Orange Slice & a Luxardo Cherry", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bootlegger Cosmo Martini', description: "Grey Goose L'Orange Vodka, Cointreau & Cranberry Juice with Freshly Squeezed Lime", price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bella Maria Martini', description: 'Grey Goose Le Citron Vodka, Chambord & Pineapple Juice with a Sugared Rim & a Lime Wedge', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Godfather', description: 'Dewars Scotch & Disaronno on the Rocks', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Negroni', description: 'Tanqueray Gin, Campari Aperitivo & Sweet Vermouth with an Orange Slice', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Bellini', description: 'Prosecco, Peach Schnapps & Peach Puree with a Cherry', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Italian Margarita', description: 'Silver Tequila, Cointreau, Sour Mix & Lime Juice, Topped with Amaretto Disaronno on the Rocks with a Sugared Rim & a Lime Wedge', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Blood Orange Cosmo Martini', description: 'Grey Goose Vodka, Cointreau & Blood Orange Puree with Freshly Squeezed Lime', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Sicilian Lemon Drop Martini', description: 'Grey Goose Le Citron Vodka & Limoncello with a Splash of Sour', price: '$19', tags: [] },
  { category: 'cocktails', name: 'Classico Martini', description: 'Chopin Vodka or Bombay Sapphire Gin with Garlic Stuffed Olives & Pepperoncini', price: '$19', tags: [] },

  // Dessert & Specialty Cocktails
  { category: 'dessert-cocktails', name: 'Bootlegger Coffee', description: "Bailey's Irish Cream, Brandy, Kahlua & Fresh Brewed Coffee, Topped with Whipped Cream & Chocolate Sprinkles", price: '$17', tags: [] },
  { category: 'dessert-cocktails', name: "Mama Maria's Coffee", description: "Crown Royal, Bailey's & Fresh Brewed Coffee, Topped with Whipped Cream & Caramel Sauce", price: '$17', tags: [] },
  { category: 'dessert-cocktails', name: 'White Chocolate Martini', description: 'Vanilla Vodka, White Crème de Cacao & White Chocolate Liqueur with a Dash of Cream', price: '$19', tags: [] },
  { category: 'dessert-cocktails', name: 'Tiramisu Martini', description: 'Vanilla Vodka, Tiramisu Liqueur & Kahlua with a Dash of Cream', price: '$19', tags: [] },

  // Italian Mocktails
  { category: 'mocktails', name: 'Lorraine Spritz', description: 'Non-Alcoholic Sparkling Wine, Non-Alcoholic Aperol & Soda Water with an Orange Slice', price: '$11', tags: [] },
  { category: 'mocktails', name: 'Strawberry Basil Spritz', description: 'Non-Alcoholic Sparkling Wine, Simple Syrup & Lime Juice with Strawberries & Basil', price: '$11', tags: [] },

  // Antipasti
  { category: 'antipasti', name: 'Bootlegger Hot Mixed Antipasto', description: "Colossal Tiger Prawns Scampi Style, Calamari & Meat Ravioli Fritti, Served with Chef Maria's Marinara Sauce", price: '$35', tags: [] },
  { category: 'antipasti', name: 'Antipasto Classico', description: "Chef's Choice of Imported Italian Cold Cuts & Cheeses, Served with Kalamata Olives, Roasted Red Peppers, Dried Figs, Almonds & Dates", price: '$34', tags: ['GF'] },
  { category: 'antipasti', name: 'Braised Pork Neck Bones', description: 'In a Light Broth with Pepperoncini & Capers, Served with Ciabatta Bread', price: '$25', tags: [] },
  { category: 'antipasti', name: 'Prawns Scampi Classic', description: "Colossal Tiger Prawns Sautéed in Chef Maria's Herb Butter, Served with Garlic Bread", price: '$24', tags: [] },
  { category: 'antipasti', name: 'Shrimp Cocktail', description: 'Chilled Colossal Tiger Prawns Served with House-Made Cocktail Sauce', price: '$23', tags: ['GF'] },
  { category: 'antipasti', name: 'Mussels Fra Diavolo', description: 'Sautéed in a White Wine & Mild, Medium or Hot Spicy Marinara Sauce, Served with Ciabatta Bread', price: '$23', tags: [] },
  { category: 'antipasti', name: 'Funghi di Maria', description: 'Mushroom Caps Filled with House-Made Sausage, Broiled in an Herb Butter Cream Sauce', price: '$20', tags: [] },
  { category: 'antipasti', name: 'Calamari Fritti', description: "Marinated, Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$19', tags: [] },
  { category: 'antipasti', name: 'Bruschetta', description: '5 Pieces with Tomato, Basil & Garlic, Finished with a Balsamic Glaze', price: '$17', tags: [] },
  { category: 'antipasti', name: 'Fresh Grilled Vegetables', description: 'Grilled Zucchini, Broccoli, Portobello Mushrooms & Peppers with Garlic & Olive Oil', price: '$17', tags: ['GF'] },
  { category: 'antipasti', name: 'Meat Ravioli Fritti', description: "Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$16', tags: [] },
  { category: 'antipasti', name: 'Mozzarella Sticks', description: "Lightly Breaded & Flash Fried, Served with Chef Maria's Marinara Sauce", price: '$16', tags: [] },
  { category: 'antipasti', name: 'Chicken Fingers or Wings', description: 'With Your Choice of Mild, Medium or Hot Sauce, Served with French Fries', price: '$16', tags: [] },

  // Salads & Soups
  { category: 'salads', name: 'Bistecca Salad', description: 'Grilled Sirloin over Spring Mix, Cherry Tomatoes, Kalamata Olives, Red Onion, Gorgonzola Cheese & Shaved Carrot, Tossed with Balsamic Vinaigrette', price: '$29', tags: ['GF'] },
  { category: 'salads', name: 'Insalata Lorraine', description: 'Radicchio, Spring Mix, Shaved Pear, Candied Walnuts & Gorgonzola Cheese, Tossed with Balsamic Vinaigrette & Finished with Balsamic Reduction', price: '$20', tags: ['GF'] },
  { category: 'salads', name: 'Mozzarella Caprese', description: 'Sliced Fresh Mozzarella, Sliced Tomatoes, Basil & Shaved Red Onion with Balsamic Reduction & Olive Oil', price: '$18', tags: ['GF'] },
  { category: 'salads', name: 'Iceberg Wedge', description: 'Crispy Pancetta, Sliced Tomato, Red Onion, Scallions & Hard-Boiled Egg with Bleu Cheese Dressing', price: '$18', tags: [] },
  { category: 'salads', name: 'Italian Cobb Salad', description: "Iceberg Lettuce, Julienne Cut Ham, Cherry Tomatoes, Red Onion & Hard-Boiled Egg, Topped with Bleu Cheese Crumbles & Chef Maria's Italian Dressing", price: '$18', tags: [] },
  { category: 'salads', name: 'Insalata di Maria', description: "Mixed Greens, Chopped Salami, Provolone Cheese, Cherry Tomatoes & Garbanzo Beans with Chef Maria's Italian Dressing", price: '$18', tags: [] },
  { category: 'salads', name: 'Insalata di Caesar', description: 'Chopped Romaine, Imported Parmesan Cheese & House-Made Rustic Croutons with Caesar Dressing', price: '$17', tags: [] },
  { category: 'salads', name: 'Insalata di Casa', description: "Spring Mix, Cherry Tomatoes, Cucumbers & Garbanzo Beans with Chef Maria's Italian Dressing", price: '$12', tags: ['V'] },
  { category: 'salads', name: 'Zuppa di Minestrone', description: "Chef Maria's Recipe with House-Made Sausage, Fresh Vegetables, White Beans & Pasta", price: '$12', tags: [] },

  // Sides
  { category: 'sides', name: 'Saffron Risotto', description: 'Creamy Italian Rice with Saffron, Tomatoes & Peas', price: '$16', tags: ['GF'] },
  { category: 'sides', name: 'Portobello Mushrooms', description: 'Sliced Portobello Mushrooms Marinated with Garlic and Herbs, Sautéed in Sherry Wine & Scampi Butter', price: '$15', tags: [] },
  { category: 'sides', name: 'Mixed Greens', description: 'Broccoli, Spinach & Onions Sautéed with Garlic & Olive Oil', price: '$12', tags: ['GF'] },
  { category: 'sides', name: 'Fresh Zucchini', description: 'Sautéed with Garlic, Olive Oil & Herbs', price: '$11', tags: ['GF', 'V'] },
  { category: 'sides', name: 'Fresh Broccoli', description: 'Grilled with Garlic & Olive Oil', price: '$11', tags: ['GF', 'V'] },
  { category: 'sides', name: 'Fresh Spinach', description: 'Sautéed in Garlic & Olive Oil', price: '$11', tags: ['GF', 'V'] },

  // Specialties della Casa
  { category: 'specialties', name: 'Chilean Sea Bass', description: 'Pan Seared Sea Bass in a Sherry Wine, Lemon & Caper Sauce, Served with Saffron Risotto & Asparagus', price: '$50', tags: [] },
  { category: 'specialties', name: 'Filet Mignon', description: '8oz Grilled Filet Mignon Served with Creamy Mashed Potatoes & Asparagus', price: '$49', tags: [] },
  { category: 'specialties', name: 'Ribeye', description: '16oz Grilled Ribeye Served with Creamy Mashed Potatoes & Asparagus', price: '$49', tags: [] },
  { category: 'specialties', name: 'NY Steak Strip', description: '16oz Grilled NY Strip Served with Creamy Mashed Potatoes, Asparagus & an Onion Ring', price: '$49', tags: [] },
  { category: 'specialties', name: 'Osso Bucco', description: 'Petite Veal Shanks Served with Saffron Risotto, Asparagus, Mushrooms, Tomatoes & Zucchini', price: '$45', tags: [] },
  { category: 'specialties', name: 'Seafood Fra Diavolo', description: 'Colossal Tiger Prawns, Clams, Calamari & Mussels, Cioppino Style in a Mild, Medium or Hot Spicy Tomato Sauce, Served over Linguine Pasta', price: '$40', tags: [] },
  { category: 'specialties', name: 'Vitello Lorraine', description: 'Veal Scaloppine Sautéed in a Marsala Wine, Mushroom & Creamy Garlic Sauce, Served with Fettuccine Alfredo', price: '$40', tags: [] },
  { category: 'specialties', name: 'Vitello Marsala', description: 'Veal Scaloppine Sautéed in a Marsala Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$39', tags: [] },
  { category: 'specialties', name: 'Vitello Picatta', description: 'Veal Scaloppine Sautéed in a Sherry Wine, Lemon & Caper Sauce, Served with Fettuccine Alfredo', price: '$39', tags: [] },
  { category: 'specialties', name: "Chef Maria's Saltimbocca", description: 'Pounded Thin & Rolled with Genoa Salami, Hot Capicola & Cheese, Dipped in Italian Egg Batter, then Sautéed in a Sherry Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: 'Chicken $36 / Veal $42', tags: [] },
  { category: 'specialties', name: 'Salmone', description: 'Pan Seared Salmon Served over House-Made Salmon Filled Squid Ink Ravioli, in a Lemon Cream Sauce with Tomatoes & Zucchini', price: '$37', tags: [] },
  { category: 'specialties', name: 'Prawns Scampi Linguine', description: "Colossal Tiger Prawns Sautéed in White Wine, Garlic & Chef Maria's Herb Butter, Served over Linguini Pasta", price: '$36', tags: [] },
  { category: 'specialties', name: 'Pork Chop Marsala', description: '12oz Bone-In Pan Roasted Pork Chop in a Marsala Wine & Mushroom Sauce, Served with Creamy Mashed Potatoes & Broccoli', price: '$34', tags: [] },
  { category: 'specialties', name: 'Pollo Francese', description: 'Chicken Scaloppine Lightly Dipped in Italian Egg Batter & Sautéed in a Sherry Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$34', tags: [] },
  { category: 'specialties', name: 'Pollo Marsala', description: 'Chicken Scaloppine Sautéed in a Marsala Wine & Mushroom Sauce, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Pollo Picatta', description: 'Chicken Scaloppine Sautéed in a Sherry Wine, Lemon & Caper Sauce, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Pollo Angelo', description: 'Chicken Breast Sautéed with Sherry Wine, Artichokes, Mushrooms, Kalamata Olives & Roasted Red Peppers, Served with Fettuccine Alfredo', price: '$32', tags: [] },
  { category: 'specialties', name: 'Linguine alla Vongole', description: "Whole & Baby Clams Sautéed in Sherry Wine & Chef Maria's Red, Broth or Cream Sauce, Served over Linguine Pasta", price: '$32', tags: [] },
  { category: 'specialties', name: 'Orange Roughy Francese', description: "Orange Roughy Lightly Dipped in Italian Egg Batter & Sautéed with Chef Maria's Herb Butter, Served with Fettuccine Alfredo", price: '$32', tags: [] },
  { category: 'specialties', name: 'Parmigiana della Casa', description: 'Lightly Breaded, Topped with Mozzarella Cheese & Baked, Served with Angel Hair Marinara', price: 'Eggplant $28 / Chicken $32 / Veal $40', tags: [] },
  { category: 'specialties', name: 'Salsiccia al Alberto', description: "House-Made Sausage with Roasted Potatoes, Sautéed Peppers, Caramelized Onions & Chef Maria's Marinara Sauce, Served with Ciabatta Bread", price: '$28', tags: [] },

  // Pasta & Healthy Specialties
  { category: 'pasta', name: 'Salmon Griglia', description: "Grilled Salmon over Sautéed Italian Greens, Served with Whole Grain Spaghetti & Chef Maria's Pomodoro Sauce", price: '$36', tags: [] },
  { category: 'pasta', name: 'Pollo Griglia', description: "Grilled Chicken Breast over Sautéed Italian Greens, Served with Whole Grain Spaghetti & Chef Maria's Pomodoro Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: "Mama's Lasagna", description: "Chef Maria's Classic Baked Lasagna with Meat Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: 'Pappardelle Bolognese', description: "Imported Ribbon Egg Pasta with Chef Maria's Creamy Bolognese Meat Sauce", price: '$30', tags: [] },
  { category: 'pasta', name: 'Vegan Chopped Steak', description: 'Sautéed & Topped with Sautéed Mushrooms & Onions, Served with Roasted Potatoes, Peppers & Broccoli', price: '$29', tags: ['V'] },
  { category: 'pasta', name: 'Bucatini alla Carbonara', description: 'Bucatini Pasta, Pancetta, Egg, Fresh Peas & Cracked Black Pepper in a Cream Sauce', price: '$29', tags: [] },
  { category: 'pasta', name: 'Spinach Fettuccine Primavera', description: "Spinach Pasta with Broccoli, Sun-Dried Tomatoes, Zucchini, Asparagus & Garlic in Chef Maria's Broth or Cream Sauce, Topped with Pine Nuts", price: '$26', tags: [] },
  { category: 'pasta', name: 'Vegan Margherita Pizza', description: "Chef Maria's Pizza Sauce, Vegan Mozzarella Cheese, Sliced Tomatoes & Fresh Basil", price: '$26', tags: ['V'] },
  { category: 'pasta', name: 'Gluten-Free Pizza', description: "Chef Maria's Pizza Sauce & Shredded Mozzarella", price: '$26', tags: ['GF'] },
  { category: 'pasta', name: 'Fettuccine Alfredo', description: 'Italian Classic with a Parmigiano Cheese Cream Sauce', price: '$25', tags: [] },
  { category: 'pasta', name: 'Gluten-Free Cheese Ravioli', description: "Served with Chef Maria's Marinara Sauce", price: '$25', tags: ['GF'] },
  { category: 'pasta', name: 'Baked Penne', description: "Penne Pasta with Chef Maria's Meat Sauce & Ricotta Cheese, Topped with Mozzarella & Baked", price: '$24', tags: [] },
  { category: 'pasta', name: 'Gluten-Free Pasta', description: "Served with Chef Maria's Marinara Sauce", price: '$24', tags: ['GF'] },
  { category: 'pasta', name: 'Spaghetti Classico', description: "Chef Maria's Classic Spaghetti with Meat Sauce · With Meatballs or Italian Sausage add $6", price: '$23', tags: [] },
  { category: 'pasta', name: 'Whole Grain Spaghetti', description: "Served with Chef Maria's Marinara Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Ravioli', description: "Meat or Cheese Ravioli with Choice of Chef Maria's Marinara, Meat or Rose Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Capellini alla Pomodoro Rustica', description: "Capellini Pasta with Fresh Tomatoes, Fresh Basil, Garlic & Olive Oil & a Touch of Chef Maria's Marinara Sauce", price: '$23', tags: [] },
  { category: 'pasta', name: 'Manicotti al Forno', description: "Pasta Crepes Filled with Fresh Ricotta Cheese & Herbs, Topped with Chef Maria's Marinara Sauce", price: '$23', tags: [] },

  // Pizzas
  { category: 'pizza', name: 'Pizza Pollo Pesto', description: 'Pesto-Basil Sauce, Grilled Chicken, Shredded Mozzarella, Red Onions & Sun-Dried Tomatoes', price: 'M $29 / L $32', tags: [] },
  { category: 'pizza', name: 'Pizza della Casa', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, House-Made Sausage, Salami, Peppers, Onions & Black Olives", price: 'M $27 / L $30', tags: [] },
  { category: 'pizza', name: 'Pizza Vegetarian', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Peppers, Onions, Mushrooms & Black Olives", price: 'M $26 / L $29', tags: [] },
  { category: 'pizza', name: 'Pizza Classica', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Pepperoni & Mushrooms", price: 'M $25 / L $27', tags: [] },
  { category: 'pizza', name: 'Pizza Margherita Caprese', description: "Chef Maria's Pizza Sauce, Shredded Mozzarella, Sliced Fresh Mozzarella, Sliced Tomatoes & Fresh Basil", price: 'M $24 / L $27', tags: [] },
  { category: 'pizza', name: 'Pizza Italian Greens', description: "Chef Maria's Herb Butter, Shredded Mozzarella, Sautéed Spinach, Broccoli & Garlic", price: 'M $24 / L $26', tags: [] },
  { category: 'pizza', name: 'Pizza White', description: "Chef Maria's Alfredo Sauce, Sliced Fresh Mozzarella, Shredded Mozzarella & Ricotta Cheese", price: 'M $24 / L $26', tags: [] },
  { category: 'pizza', name: 'Pizza al Formaggio', description: "Chef Maria's Pizza Sauce & Shredded Mozzarella", price: 'M $21 / L $23', tags: [] },
  { category: 'pizza', name: 'Combo: Medium Cheese Pizza & Chicken Wings', description: null, price: '$33', tags: [] },
  { category: 'pizza', name: 'Combo: Large Cheese Pizza & Double Chicken Wings', description: null, price: '$46', tags: [] },

  // Sandwiches (Lunch Menu)
  { category: 'sandwiches', name: 'Meatball Sub', description: 'Served with House-Made Pasta Salad or French Fries', price: '$20', tags: [] },
];

const menuCategories = menuSections.map(s => s.id);

const MenuList = () => {
  return (
    <div>
      <div style={{
        marginBottom: 'var(--space-xl)',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          color: 'var(--accent-gold)',
          marginBottom: 'var(--space-xs)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
        }}>Est. 1949 · South Strip Las Vegas</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'var(--fg)',
          lineHeight: 1.1,
        }}>Chef Maria's <span style={{ color: 'var(--accent-red)' }}>Menu</span></h2>
        <p style={{
          fontSize: 'var(--text-meta)',
          color: 'var(--muted)',
          marginTop: '6px',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}>Award-Winning Recipes · Made Fresh In House · GF = Gluten-Free · V = Vegan</p>
      </div>

      {menuSections.map((section) => {
        const items = fullMenu.filter(i => i.category === section.id);
        if (items.length === 0) return null;
        return (
          <div key={section.id} style={{ marginBottom: 'var(--space-2xl)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: section.note ? 'var(--space-xs)' : 'var(--space-md)',
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'var(--accent-wine)',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.4,
                }}>{section.title}</h3>
                {section.sub && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    marginTop: '1px',
                    whiteSpace: 'nowrap',
                  }}>{section.sub}</p>
                )}
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            {section.note && (
              <p style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--muted)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-sm)',
                paddingBottom: 'var(--space-xs)',
                borderBottom: '1px dashed var(--border)',
              }}>{section.note}</p>
            )}
            {items.map((item, i) => (
              <MenuItem key={item.name} {...item} isLast={i === items.length - 1} />
            ))}
          </div>
        );
      })}

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'var(--space-md)',
        marginTop: 'var(--space-sm)',
        fontSize: 'var(--text-meta)',
        color: 'var(--muted)',
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.
      </div>
    </div>
  );
};

Object.assign(window, { MenuList, fullMenu, menuCategories, menuSections });
