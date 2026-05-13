import React, { useState } from 'react';

const ChefBotSite = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError('Por favor, insira alguns ingredientes');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const mockRecipes = [
        {
          name: 'Salada Caprese Gourmet',
          time: '15 min',
          difficulty: 'Fácil',
          steps: [
            'Lave os tomates e a mozzarela',
            'Corte os tomates em rodelas',
            'Distribua a mozzarela sobre os tomates',
            'Regue com azeite de oliva extra virgem',
            'Adicione folhas de manjericão fresco',
            'Tempere com sal e pimenta a gosto',
            'Sirva imediatamente'
          ],
          ingredients: ingredients.split(',').map(ing => ing.trim()).filter(ing => ing)
        }
      ];

      setRecipe(mockRecipes[0]);
      setLoading(false);
    }, 1500);
  };

  const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #2a1810 0%, #3d2415 100%)', fontFamily: "'Inter', sans-serif", color: '#fff' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'rgba(42, 24, 16, 0.95)', borderBottom: '2px solid #F4671A', marginBottom: '40px' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 'bold', fontFamily: "'Cormorant Garamond', serif" },
    logoChef: { width: '50px', height: '50px', background: '#F4671A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' },
    slogan: { fontSize: '14px', color: '#F4671A', fontStyle: 'italic' },
    hero: { textAlign: 'center', padding: '60px 40px', marginBottom: '40px' },
    title: { fontSize: '56px', fontFamily: "'Cormorant Garamond', serif", marginBottom: '16px', background: 'linear-gradient(135deg, #F4671A 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 'bold' },
    subtitle: { fontSize: '18px', color: '#ddd', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' },
    formContainer: { maxWidth: '700px', margin: '0 auto', padding: '40px', background: 'rgba(62, 37, 28, 0.8)', borderRadius: '12px', border: '1px solid rgba(244, 103, 26, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
    label: { display: 'block', marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#F4671A' },
    textarea: { width: '100%', minHeight: '120px', padding: '16px', marginBottom: '20px', background: 'rgba(42, 24, 16, 0.6)', border: '2px solid #F4671A', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' },
    button: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #F4671A 0%, #ff8c42 100%)', border: 'none', borderRadius: '8px', color: '#2a1810', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(244, 103, 26, 0.3)' },
    recipeCard: { maxWidth: '700px', margin: '40px auto', padding: '40px', background: 'rgba(62, 37, 28, 0.8)', borderRadius: '12px', border: '1px solid rgba(244, 103, 26, 0.3)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
    recipeName: { fontSize: '32px', fontFamily: "'Cormorant Garamond', serif", color: '#F4671A', marginBottom: '20px', borderBottom: '2px solid #F4671A', paddingBottom: '16px' },
    sectionTitle: { fontSize: '18px', fontFamily: "'Cormorant Garamond', serif", color: '#F4671A', marginTop: '24px', marginBottom: '12px', fontWeight: 'bold' },
    steps: { listStyleType: 'none', padding: '0', margin: '0' },
    step: { padding: '12px', marginBottom: '8px', background: 'rgba(244, 103, 26, 0.1)', borderLeft: '4px solid #F4671A', borderRadius: '4px', fontSize: '14px', lineHeight: '1.6' },
    error: { padding: '16px', background: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545', borderRadius: '8px', color: '#ff6b6b', marginBottom: '20px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoChef}>👨‍🍳</div>
          <div><div><span style={{ color: '#fff' }}>Receita</span><span style={{ color: '#F4671A' }}>Bot</span></div><div style={styles.slogan}>Chef na sua cozinha</div></div>
        </div>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.title}>Gere Receitas Incríveis</h1>
        <p style={styles.subtitle}>Insira seus ingredientes e deixe o ChefBot criar uma receita perfeita para você</p>
      </div>

      <div style={styles.formContainer}>
        <label style={styles.label}>Seus Ingredientes</label>
        <textarea style={styles.textarea} placeholder="Ex: tomate, cebola, alho, azeite" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.button} onClick={generateRecipe} disabled={loading}>{loading ? 'Gerando...' : '✨ Gerar Receita'}</button>
      </div>

      {recipe && !loading && (
        <div style={styles.recipeCard}>
          <h2 style={styles.recipeName}>{recipe.name}</h2>
          <h3 style={styles.sectionTitle}>👨‍🍳 Modo de Preparo</h3>
          <ol style={styles.steps}>
            {recipe.steps.map((step, idx) => (<li key={idx} style={styles.step}><strong>Passo {idx + 1}:</strong> {step}</li>))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ChefBotSite;
